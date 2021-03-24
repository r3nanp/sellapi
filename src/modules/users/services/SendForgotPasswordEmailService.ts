import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'

interface Request {
  email: string
}

export class SendForgotPasswordEmailService implements Service<Request, void> {
  async execute({ email }: Request): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository)
    const userTokenRepository = getCustomRepository(UserTokensRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.')
    }

    const generatedToken = await userTokenRepository.generate(user.id)

    console.log(generatedToken)
  }
}
