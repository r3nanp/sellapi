import { IOrdersProducts } from '@modules/orders/domain/models/OrdersProducts'
export interface IProduct {
  readonly id: string
  orders_products: IOrdersProducts[]
  name: string
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
}
