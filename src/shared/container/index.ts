import { container } from 'tsyringe'
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository'
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository
)
