import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { ICustomer } from '../domain/models/Customer'
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository'

type Request = Pick<ICustomer, 'id' | 'name' | 'email'>
type Response = ICustomer

@injectable()
export class UpdateCustomerService implements Service<Request, Response> {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  async execute({ id, name, email }: Request): Promise<Response> {
    const props = { name, email }

    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    const customerExists = await this.customersRepository.findByEmail(email)

    if (!customerExists) {
      throw new AppError('Customer with this email already exists!')
    }

    Object.assign(customer, props)

    await this.customersRepository.save(customer)

    return customer
  }
}
