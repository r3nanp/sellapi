import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

interface Request {
  name: string
  price: number
  quantity: number
}

export class CreateProductService implements Service<Request, void> {
  async execute({ name, price, quantity }: Request): Promise<Request> {
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
