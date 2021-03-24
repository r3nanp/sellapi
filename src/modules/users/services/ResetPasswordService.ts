import { getCustomRepository } from 'typeorm'
import { isAfter, addHours } from 'date-fns'
import bcrypt from 'bcryptjs'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'

interface Request {
  token: string
  password: string
}

export class ResetPasswordService implements Service<Request, void> {
  async execute({ token, password }: Request): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository)
    const userTokenRepository = getCustomRepository(UserTokensRepository)

    const userToken = await userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists.')
    }

    const user = await usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.created_at
    const compareTokenDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareTokenDate)) {
      throw new AppError('Token expired.')
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    user.password = hashedPassword

    await usersRepository.save(user)
  }
}
