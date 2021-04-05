import { ICustomer } from '@modules/customers/domain/models/Customer'
import { IProduct } from '@modules/products/domain/models/Product'
import { IOrder } from '../models/Order'
import { ICreateProducts } from '../models/ICreateProducts'

type Response = IOrder | undefined

type IUpdateStock = Pick<IProduct, 'id' | 'quantity'>

interface Request {
  customer: ICustomer
  products: ICreateProducts[]
}

export interface IOrdersRepository {
  findById(id: string): Promise<Response>
  createOrder(data: Request): Promise<IOrder>
  updatedStock(products: IUpdateStock[]): Promise<void>
}
