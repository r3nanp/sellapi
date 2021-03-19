import { EntityRepository, Repository } from 'typeorm'
import { Product } from '../entities/product.entity'

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name
      }
    })

    return product
  }
}
