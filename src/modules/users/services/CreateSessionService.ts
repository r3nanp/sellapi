import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { User } from '../infra/typeorm/entities/user.entity'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'
import auth from '@config/auth'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

export class CreateSessionService implements Service<Request, Response> {
  async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordConfirmed = await bcrypt.compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = jwt.sign({}, auth.secret, {
      subject: user.id,
      expiresIn: auth.expiresIn
    })

    return {
      user,
      token
    }
  }
}
