import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { ICustomer } from '../domain/models/Customer'
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository'

type Response = ICustomer[]

@injectable()
export class SearchCustomerService implements Service<void, Response> {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  async execute(): Promise<Response> {
    const customers = await this.customersRepository.find()

    return customers
  }
}
