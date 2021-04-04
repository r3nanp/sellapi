import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository'

type Request = string

@injectable()
export class DeleteCustomerService implements Service<Request, void> {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  async execute(id: Request): Promise<void> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    await this.customersRepository.remove(customer)
  }
}
