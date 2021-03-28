import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Customer } from '../infra/typeorm/entities/customer.entity'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

interface Request {
  name: string
  email: string
}

type Response = Customer

export class CreateCustomerService implements Service<Request, Response> {
  async execute({ name, email }: Request): Promise<Response> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customerExists = await customersRepository.findByEmail(email)

    if (customerExists) {
      throw new AppError('A customer with this email already exists.')
    }

    const customer = customersRepository.create({
      name,
      email
    })

    await customersRepository.save(customer)

    return customer
  }
}
