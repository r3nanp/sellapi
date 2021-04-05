import { container } from 'tsyringe'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository'
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository'
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository'
import { IProductRepository } from '@modules/products/domain/repositories/ProductsRepository'
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import { IOrdersRepository } from '@modules/orders/domain/repositories/OrdersRepository'
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductsRepository
)

container.registerSingleton<IOrdersRepository>(
  'OrderRepository',
  OrdersRepository
)

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository
)
