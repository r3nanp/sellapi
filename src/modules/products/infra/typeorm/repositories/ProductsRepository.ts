import { EntityRepository, In, Repository } from 'typeorm'
import { Product } from '@modules/products/infra/typeorm/entities/product.entity'

type Response = Product | undefined
interface Products {
  id: string
}

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async findByName(name: string): Promise<Response> {
    const product = await this.findOne({
      where: {
        name
      }
    })

    return product
  }

  async findAllById(products: Products[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id)

    const existsProducts = await this.find({
      where: {
        id: In(productsIds)
      }
    })

    return existsProducts
  }
}
