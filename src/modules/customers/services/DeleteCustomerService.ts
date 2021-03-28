import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

type Request = string

export class DeleteCustomerService implements Service<Request, void> {
  async execute(id: Request): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository)
    const customer = await customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    await customersRepository.remove(customer)
  }
}
