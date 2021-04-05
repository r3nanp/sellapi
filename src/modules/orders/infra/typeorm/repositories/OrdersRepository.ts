import { getRepository, Repository } from 'typeorm'
import { Order } from '@modules/orders/infra/typeorm/entities/order.entity'
import { IOrder } from '@modules/orders/domain/models/Order'
import { IProduct } from '@modules/products/domain/models/Product'
import { ICustomer } from '@modules/customers/domain/models/Customer'
import { IOrdersRepository } from '@modules/orders/domain/repositories/OrdersRepository'
import { ICreateProducts } from '@modules/orders/domain/models/ICreateProducts'

type IUpdateStock = Pick<IProduct, 'id' | 'quantity'>

interface Request {
  customer: ICustomer
  products: ICreateProducts[]
}

type Response = IOrder | undefined

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<IOrder>

  constructor() {
    this.ormRepository = getRepository(Order)
  }

  async createOrder(data: Request): Promise<IOrder> {
    const { customer, products } = data

    const order = this.ormRepository.create({
      customer,
      orders_products: products
    })

    await this.ormRepository.save(order)

    return order
  }

  async updatedStock(products: IUpdateStock[]): Promise<void> {
    await this.ormRepository.save(products)
  }

  async findById(id: string): Promise<Response> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['orders_products', 'customer']
    })

    return order
  }
}
