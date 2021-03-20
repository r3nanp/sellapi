import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

type Request = string

export class DeleteProductService implements Service<Request, void> {
  async execute(id: Request): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    await productsRepository.remove(product)
  }
}
