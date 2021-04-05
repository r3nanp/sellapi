import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { RedisCache } from '@shared/cache/RedisCache'
import { IProduct } from '../domain/models/Product'
import { IProductRepository } from '../domain/repositories/ProductsRepository'

type Response = IProduct[]

@injectable()
export class SearchProductService implements Service<void, Response> {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute(): Promise<Response> {
    const redisCache = new RedisCache()

    let cachedProducts = await redisCache.recover<Response>(
      'sell_api@PRODUCTS_LIST'
    )

    if (!cachedProducts) {
      cachedProducts = await this.productsRepository.findAll()

      await redisCache.save('sell_api@PRODUCTS_LIST', cachedProducts)
    }

    return cachedProducts
  }
}
