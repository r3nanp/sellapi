import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { User } from '../infra/typeorm/entities/user.entity'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/errors/AppError'

type Request = string

type Response = User

export class ShowProfileService implements Service<Request, Response> {
  async execute(id: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}
