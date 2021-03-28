import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Customer } from '../infra/typeorm/entities/customer.entity'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

interface Request {
  id: string
  name: string
  email: string
}

type Response = Customer

export class UpdateCustomerService implements Service<Request, Response> {
  async execute({ id, name, email }: Request): Promise<Response> {
    const props = { name, email }

    const customersRepository = getCustomRepository(CustomersRepository)
    const customer = await customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    const customerExists = await customersRepository.findByEmail(email)

    if (!customerExists) {
      throw new AppError('Customer with this email already exists!')
    }

    Object.assign(customer, props)

    await customersRepository.save(customer)

    return customer
  }
}
