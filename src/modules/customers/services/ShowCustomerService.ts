import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Customer } from '../infra/typeorm/entities/customer.entity'
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository'

type Request = string
type Response = Customer

@injectable()
export class ShowCustomerService implements Service<Request, Response> {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  async execute(id: Request): Promise<Response> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found.')
    }

    return customer
  }
}
