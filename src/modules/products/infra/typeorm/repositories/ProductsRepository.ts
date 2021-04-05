import { getRepository, In, Repository } from 'typeorm'
import { IProductRepository } from '@modules/products/domain/repositories/ProductsRepository'
import { IProduct } from '@modules/products/domain/models/Product'
import { Product } from '../entities/product.entity'

type IUpdateStock = Pick<IProduct, 'id' | 'quantity'>

type Response = IProduct | undefined

export class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<IProduct>

  constructor() {
    this.ormRepository = getRepository(Product)
  }

  async create({ name, price, quantity }: IProduct): Promise<IProduct> {
    const product = this.ormRepository.create({ name, price, quantity })

    await this.ormRepository.save(product)

    return product
  }

  async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product)

    return product
  }

  async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product)
  }

  async findAll(): Promise<IProduct[]> {
    const products = await this.ormRepository.find()

    return products
  }

  async findById(id: string): Promise<Response> {
    const product = await this.ormRepository.findOne({
      where: {
        id
      }
    })

    return product
  }

  async updatedStock(products: IUpdateStock[]): Promise<void> {
    await this.ormRepository.save(products)
  }

  async findByName(name: string): Promise<Response> {
    const product = await this.ormRepository.findOne({
      where: {
        name
      }
    })

    return product
  }

  async findAllById(products: IProduct[]): Promise<IProduct[]> {
    const productsIds = products.map(product => product.id)

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds)
      }
    })

    return existsProducts
  }
}
