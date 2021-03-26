import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'
import { User } from '../infra/typeorm/entities/user.entity'

interface Request {
  id: string
  name: string
  email: string
  password?: string
  old_password?: string
}

type Response = User

export class UpdateProfileService implements Service<Request, Response> {
  async execute({
    id,
    name,
    email,
    password,
    old_password
  }: Request): Promise<Response> {
    const props = { name, email }

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(id)

    if (!user) {
      throw new AppError('User not found.')
    }

    const userEmail = await userRepository.findByEmail(email)

    if (userEmail && userEmail.id !== id) {
      throw new AppError('A user with this email already exists.')
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.')
    }

    if (password && old_password) {
      const checkOldPassword = await bcrypt.compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.')
      }

      user.password = await bcrypt.hash(password, 8)
    }

    Object.assign(user, props)

    await userRepository.save(user)

    return user
  }
}
