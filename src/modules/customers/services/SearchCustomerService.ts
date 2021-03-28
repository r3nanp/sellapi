import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { Customer } from '../infra/typeorm/entities/customer.entity'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

type Response = Customer[]

export class SearchCustomerService implements Service<Request, Response> {
  async execute(): Promise<Response> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.find()

    return customer
  }
}
