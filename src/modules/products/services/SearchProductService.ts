import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { Product } from '../infra/typeorm/entities/product.entity'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

type Response = {
  products: Product[]
}

export class SearchProductService implements Service<void, Response> {
  async execute(): Promise<Response> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const products = await productsRepository.find()

    return { products }
  }
}
