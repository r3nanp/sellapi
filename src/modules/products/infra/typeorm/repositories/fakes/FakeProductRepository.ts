import { IProduct } from '@modules/products/domain/models/Product'
import { IProductRepository } from '@modules/products/domain/repositories/ProductsRepository'
import { Product } from '../../entities/product.entity'

type Response = IProduct | undefined
type IUpdateStock = Pick<IProduct, 'id' | 'quantity'>

export class FakeProductsRepository implements IProductRepository {
  private products: IProduct[] = []

  async create({ name, price, quantity }: IProduct): Promise<IProduct> {
    const props = { name, price, quantity }

    const product = new Product()

    Object.assign(product, props)

    this.products.push(product)

    return product
  }

  async save(product: IProduct): Promise<IProduct> {
    Object.assign(this.products, product)

    return product
  }

  async updatedStock(products: IUpdateStock[]): Promise<void> {
    Object.assign(this.products, products)
  }

  async findAll(): Promise<IProduct[]> {
    const product = this.products.map(product => product)

    return product
  }

  async findAllById(products: IProduct[]): Promise<IProduct[]> {
    const productsIds = products.map(product => product.id)

    const product = this.products.map(product => product)

    return product
  }

  async findByName(name: string): Promise<Response> {
    const product = this.products.find(product => product.name === name)
    return product
  }

  async findById(id: string): Promise<Response> {
    const product = this.products.find(product => product.id === id)

    return product
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async remove(product: IProduct): Promise<void> {
    const pro = this.products.find(p => p.id === product.id)

    this.products.splice(Number(pro))
  }
}
