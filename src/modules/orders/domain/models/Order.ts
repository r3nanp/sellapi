import { Customer } from '@modules/customers/infra/typeorm/entities/customer.entity'
import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/orders_products.entity'

export interface IOrder {
  readonly id: string
  customer: Customer
  orders_products: Array<OrdersProducts>
  created_at: Date
  updated_at: Date
}
