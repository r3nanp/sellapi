import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Product } from '../infra/typeorm/entities/product.entity'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

type Request = string

type Response = Product

export class ShowProductService implements Service<Request, Response> {
  async execute(id: Request): Promise<Response> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    return product
  }
}
