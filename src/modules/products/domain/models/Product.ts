import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/orders_products.entity'

export interface IProduct {
  readonly id: string
  orders_products: Array<OrdersProducts>
  name: string
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
}
