import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { RedisCache } from '@shared/cache/RedisCache'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

type Request = string

export class DeleteProductService implements Service<Request, void> {
  async execute(id: Request): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    const redisCache = new RedisCache()

    await redisCache.invalidate('sell_api@PRODUCTS_LIST')

    await productsRepository.remove(product)
  }
}
