import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { RedisCache } from '@shared/cache/RedisCache'
import { IProduct } from '../domain/models/Product'
import { inject, injectable } from 'tsyringe'
import { IProductRepository } from '../domain/repositories/ProductsRepository'

type Request = Pick<IProduct, 'id' | 'name' | 'quantity' | 'price'>

type Response = IProduct

@injectable()
export class UpdateProductService implements Service<Request, Response> {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute({ id, name, price, quantity }: Request): Promise<Response> {
    const props = { name, price, quantity }

    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    const productExists = await this.productsRepository.findByName(name)

    if (productExists) {
      throw new AppError('A product with this name already exists.')
    }

    const redisCache = new RedisCache()

    Object.assign(product, props)

    await redisCache.invalidate('sell_api@PRODUCTS_LIST')

    await this.productsRepository.save(product)

    return product
  }
}
