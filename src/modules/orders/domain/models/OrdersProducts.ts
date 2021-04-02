import { Order } from '@modules/orders/infra/typeorm/entities/order.entity'
import { Product } from '@modules/products/infra/typeorm/entities/product.entity'

export interface IOrdersProducts {
  readonly id: string
  readonly order_id: string
  readonly product_id: string
  order: Order
  product: Product
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
}
