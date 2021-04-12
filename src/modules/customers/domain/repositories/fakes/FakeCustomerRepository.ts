import { Customer } from '@modules/customers/infra/typeorm/entities/customer.entity'
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository'
import { ICustomer } from '@modules/customers/domain/models/Customer'

type Response = ICustomer | undefined

export class FakeCustomersRepository implements ICustomerRepository {
  private customers: ICustomer[] = []

  async create({ name, email }: ICustomer): Promise<ICustomer> {
    const customer = new Customer()

    customer.name = name
    customer.email = email

    this.customers.push(customer)

    return customer
  }

  async save(customer: Customer): Promise<ICustomer> {
    Object.assign(this.customers, customer)

    return customer
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async remove(_customer: Customer): Promise<void> {}

  async findAll(): Promise<ICustomer[]> {
    const customer = this.customers.map(customer => customer)

    return customer
  }

  async findByName(name: string): Promise<Response> {
    const customer = this.customers.find(customer => customer.name === name)
    return customer
  }

  async findByEmail(email: string): Promise<Response> {
    const customer = this.customers.find(customer => customer.email === email)
    return customer
  }

  async findById(id: string): Promise<Response> {
    const customer = this.customers.find(customer => customer.id === id)
    return customer
  }
}
