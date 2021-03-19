import { EntityRepository, Repository } from 'typeorm'
import { Product } from '../infra/entities/product.entity'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findByName(name: string): Promise<Product | undefined> {
    return this.findOne({ name })
  }
}
