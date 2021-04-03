import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { BcryptAdapter } from '@shared/infra/cryptography/BcryptAdapter'
import { IUser } from '../domain/models/User'
import { IUserRepository } from '../domain/repositories/IUserRepository'

type Request = Pick<
  IUser,
  'id' | 'name' | 'email' | 'password' | 'old_password'
>

type Response = IUser

@injectable()
export class UpdateProfileService implements Service<Request, Response> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({
    id,
    name,
    email,
    password,
    old_password
  }: Request): Promise<Response> {
    const props = { name, email }
    const user = await this.usersRepository.findById(id)

    const bcrypt = new BcryptAdapter(8)

    if (!user) {
      throw new AppError('User not found.')
    }

    const userEmail = await this.usersRepository.findByEmail(email)

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

      user.password = await bcrypt.hash(password)
    }

    Object.assign(user, props)

    await this.usersRepository.save(user)

    return user
  }
}
