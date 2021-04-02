import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository'
import { ICustomer } from '../domain/models/Customer'

type Request = Pick<ICustomer, 'name' | 'email'>

type Response = ICustomer

@injectable()
export class CreateCustomerService implements Service<Request, Response> {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  async execute({ name, email }: Request): Promise<Response> {
    const customerExists = await this.customersRepository.findByEmail(email)

    if (customerExists) {
      throw new AppError('A customer with this email already exists.')
    }

    const customer = await this.customersRepository.create({
      name,
      email
    })

    await this.customersRepository.save(customer)

    return customer
  }
}
