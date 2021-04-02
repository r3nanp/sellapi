import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { RedisCache } from '@shared/cache/RedisCache'
import { Product } from '../infra/typeorm/entities/product.entity'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

type Response = Product[]

export class SearchProductService implements Service<void, Response> {
  async execute(): Promise<Response> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const redisCache = new RedisCache()

    let cachedProducts = await redisCache.recover<Response>(
      'sell_api@PRODUCTS_LIST'
    )

    if (!cachedProducts) {
      cachedProducts = await productsRepository.find()

      await redisCache.save('sell_api@PRODUCTS_LIST', cachedProducts)
    }

    return cachedProducts
  }
}
