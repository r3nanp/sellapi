import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { RedisCache } from '@shared/cache/RedisCache'
import { IProductRepository } from '../domain/repositories/ProductsRepository'

type Request = string

@injectable()
export class DeleteProductService implements Service<Request, void> {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute(id: Request): Promise<void> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    const redisCache = new RedisCache()

    await redisCache.invalidate('sell_api@PRODUCTS_LIST')

    await this.productsRepository.remove(product)
  }
}
