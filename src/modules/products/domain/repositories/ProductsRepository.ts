import { IProduct } from '../models/Product'

type ICreateProduct = Pick<IProduct, 'name' | 'quantity' | 'price'>

type IUpdateStock = Pick<IProduct, 'id' | 'quantity'>

type IFindProduct = Pick<IProduct, 'id'>

type Response = IProduct | undefined

export interface IProductRepository {
  findAll(): Promise<IProduct[]>
  findById(id: string): Promise<Response>
  findByName(name: string): Promise<Response>
  findAllById(products: IFindProduct[]): Promise<IProduct[]>
  updatedStock(products: IUpdateStock[]): Promise<void>
  create(data: ICreateProduct): Promise<IProduct>
  save(product: IProduct): Promise<IProduct>
  remove(product: IProduct): Promise<void>
}
