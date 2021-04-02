import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository'

type Request = string

export class DeleteCustomerService implements Service<Request, void> {
  constructor(private customersRepository: ICustomerRepository) {}

  async execute(id: Request): Promise<void> {
    const customer = await this.customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    await this.customersRepository.remove(customer)
  }
}
