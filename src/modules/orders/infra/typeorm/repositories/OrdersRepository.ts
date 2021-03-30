import { EntityRepository, Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { Customer } from '@modules/customers/infra/typeorm/entities/customer.entity'

interface IProduct {
  product_id: string
  price: number
  quantity: number
}

interface Request {
  customer: Customer
  products: IProduct[]
}

type Response = Order | undefined

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async createOrder({ customer, products }: Request): Promise<Order> {
    const order = this.create({
      customer,
      orders_products: products
    })

    await this.save(order)

    return order
  }

  async findById(id: string): Promise<Response> {
    const order = await this.findOne(id, {
      relations: ['orders_products', 'customer']
    })

    return order
  }
}
