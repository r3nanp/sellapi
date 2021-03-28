import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Product } from '../infra/typeorm/entities/product.entity'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

interface Request {
  name: string
  price: number
  quantity: number
}

type Response = Product

export class CreateProductService implements Service<Request, Response> {
  async execute({ name, price, quantity }: Request): Promise<Response> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const productExists = await productsRepository.findByName(name)

    if (productExists) {
      throw new AppError('A product with this name already exists.')
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    })

    await productsRepository.save(product)

    return product
  }
}
