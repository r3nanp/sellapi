import { ICustomer } from '@modules/customers/domain/models/Customer'
import { IOrdersProducts } from './OrdersProducts'

type IOrdersProduct = Pick<IOrdersProducts, 'product_id' | 'price' | 'quantity'>

export interface IOrder {
  readonly id: string
  customer: ICustomer
  orders_products: IOrdersProduct[]
  created_at: Date
  updated_at: Date
}
