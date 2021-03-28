import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Customer } from '../infra/typeorm/entities/customer.entity'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

type Request = string
type Response = Customer

export class ShowCustomerService implements Service<Request, Response> {
  async execute(id: Request): Promise<Response> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found.')
    }

    return customer
  }
}
