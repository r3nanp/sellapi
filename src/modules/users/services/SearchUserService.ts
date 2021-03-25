import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { User } from '../infra/typeorm/entities/user.entity'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'

type Response = User[]

export class SearchUserService implements Service<void, Response> {
  async execute(): Promise<Response> {
    const usersRepository = getCustomRepository(UserRepository)

    const users = await usersRepository.find()

    return users
  }
}
