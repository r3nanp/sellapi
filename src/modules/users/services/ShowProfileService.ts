import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { IUser } from '../domain/models/User'
import { IUserRepository } from '../domain/repositories/IUserRepository'

type Request = string

type Response = IUser

@injectable()
export class ShowProfileService implements Service<Request, Response> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute(id: Request): Promise<Response> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}
