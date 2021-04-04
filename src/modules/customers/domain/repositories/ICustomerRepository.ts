import { ICustomer } from '../models/Customer'

type ICreateCustomer = Pick<ICustomer, 'name' | 'email'>

type Response = ICustomer | undefined

export interface ICustomerRepository {
  findAll(): Promise<ICustomer[]>
  findByName(name: string): Promise<Response>
  findByEmail(email: string): Promise<Response>
  findById(id: string): Promise<Response>
  create(data: ICreateCustomer): Promise<ICustomer>
  save(customer: ICustomer): Promise<ICustomer>
  remove(customer: ICustomer): Promise<void>
}
