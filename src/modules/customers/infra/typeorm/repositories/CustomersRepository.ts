import { getRepository, Repository } from 'typeorm'
import { Customer } from '@modules/customers/infra/typeorm/entities/customer.entity'
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository'
import { ICustomer } from '@modules/customers/domain/models/Customer'

type Response = ICustomer | undefined

export class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<ICustomer>

  constructor() {
    this.ormRepository = getRepository(Customer)
  }

  async create({ name, email }: ICustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email })

    await this.ormRepository.save(customer)

    return customer
  }

  async save(customer: Customer): Promise<ICustomer> {
    await this.ormRepository.save(customer)

    return customer
  }

  async findAll(): Promise<ICustomer[]> {
    const customer = await this.ormRepository.find()

    return customer
  }

  async findByName(name: string): Promise<Response> {
    const customer = await this.ormRepository.findOne({
      where: {
        name
      }
    })

    return customer
  }

  async findByEmail(email: string): Promise<Response> {
    const customer = await this.ormRepository.findOne({
      where: {
        email
      }
    })
    return customer
  }

  async findById(id: string): Promise<Response> {
    const customer = await this.ormRepository.findOne({
      where: {
        id
      }
    })
    return customer
  }
}
