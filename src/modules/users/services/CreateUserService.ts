import { inject, injectable } from 'tsyringe'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { BcryptAdapter } from '@shared/infra/cryptography/BcryptAdapter'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { IUser } from '../domain/models/User'

type Request = Pick<IUser, 'name' | 'password' | 'email'>

type Response = IUser

@injectable()
export class CreateUserService implements Service<Request, Response> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: Request): Promise<Response> {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('A user with this email already exists.')
    }

    const bcrypt = new BcryptAdapter(8)
    const hashedPassword = await bcrypt.hash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await this.usersRepository.save(user)

    return user
  }
}
