import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Product } from '../infra/typeorm/entities/product.entity'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

interface Request {
  id: string
  name: string
  price: number
  quantity: number
}

type Response = Product

export class UpdateProductService implements Service<Request, Response> {
  async execute({ id, name, price, quantity }: Request): Promise<Response> {
    const props = { name, price, quantity }

    const productsRepository = getCustomRepository(ProductsRepository)
    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    const productExists = await productsRepository.findByName(name)

    if (productExists) {
      throw new AppError('A product with this name already exists.')
    }

    Object.assign(product, props)

    await productsRepository.save(product)

    return product
  }
}
