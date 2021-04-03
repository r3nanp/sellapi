import { container } from 'tsyringe'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository'
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository'
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { IUserTokens } from '@modules/users/domain/models/UserTokens'
import { UserTokens } from '@modules/users/infra/typeorm/entities/UserTokens.entity'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokens>('UserTokens', UserTokens)

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository
)
