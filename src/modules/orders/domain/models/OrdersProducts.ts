import { IOrder } from './Order'
import { IProduct } from '@modules/products/domain/models/Product'

export interface IOrdersProducts {
  readonly id: string
  readonly order_id: string
  readonly product_id: string
  order: IOrder
  product: IProduct
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
}
