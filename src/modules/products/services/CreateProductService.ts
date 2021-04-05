import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { RedisCache } from '@shared/cache/RedisCache'
import { IProductRepository } from '../domain/repositories/ProductsRepository'
import { IProduct } from '../domain/models/Product'

type Request = Pick<IProduct, 'name' | 'quantity' | 'price'>

type Response = IProduct

@injectable()
export class CreateProductService implements Service<Request, Response> {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute({ name, price, quantity }: Request): Promise<Response> {
    const productExists = await this.productsRepository.findByName(name)

    if (productExists) {
      throw new AppError('A product with this name already exists.')
    }

    const redisCache = new RedisCache()

    const product = await this.productsRepository.create({
      name,
      price,
      quantity
    })

    await redisCache.invalidate('sell_api@PRODUCTS_LIST')

    await this.productsRepository.save(product)

    return product
  }
}
