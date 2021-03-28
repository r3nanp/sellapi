import { EntityRepository, Repository } from 'typeorm'
import { Customer } from '../entities/customer.entity'

type Response = Customer | undefined

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  async findByName(name: string): Promise<Response> {
    const customer = await this.findOne({
      where: {
        name
      }
    })

    return customer
  }

  async findByEmail(email: string): Promise<Response> {
    const customer = await this.findOne({
      where: {
        email
      }
    })
    return customer
  }

  async findById(id: string): Promise<Response> {
    const customer = await this.findOne({
      where: {
        id
      }
    })
    return customer
  }
}
