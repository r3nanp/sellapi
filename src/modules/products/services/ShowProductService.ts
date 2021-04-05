import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { IProduct } from '../domain/models/Product'
import { IProductRepository } from '../domain/repositories/ProductsRepository'

type Request = string

type Response = IProduct

@injectable()
export class ShowProductService implements Service<Request, Response> {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute(id: Request): Promise<Response> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    return product
  }
}
