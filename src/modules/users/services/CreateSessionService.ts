import { inject, injectable } from 'tsyringe'
import jwt from 'jsonwebtoken'
import auth from '@config/auth'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { BcryptAdapter } from '@shared/infra/cryptography/BcryptAdapter'
import { IUser } from '../domain/models/User'
import { IUserRepository } from '../domain/repositories/IUserRepository'

type Request = Pick<IUser, 'email' | 'password'>
interface Response {
  user: IUser
  token: string
}

@injectable()
export class CreateSessionService implements Service<Request, Response> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const bcrypt = new BcryptAdapter(8)

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
