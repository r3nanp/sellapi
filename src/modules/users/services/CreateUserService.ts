import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'

interface Request {
  name: string
  email: string
  password: string
}

export class CreateUserService implements Service<Request, void> {
  async execute({ name, email, password }: Request): Promise<Request> {
    const usersRepository = getCustomRepository(UserRepository)

    const emailExists = await usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('A user with this email already exists.')
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const product = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await usersRepository.save(product)

    return product
  }
}
