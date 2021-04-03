import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { IUser } from '../domain/models/User'

type Response = IUser[]

@injectable()
export class SearchUserService implements Service<void, Response> {
  constructor(
    @inject('CustomersRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute(): Promise<Response> {
    const users = await this.usersRepository.findAll()

    return users
  }
}
