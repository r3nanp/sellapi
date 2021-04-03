import { inject, injectable } from 'tsyringe'
import path from 'path'
import fsPromises from 'fs/promises'
import uploadConfig from '@config/upload'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { IUser } from '../domain/models/User'
import { IUserRepository } from '../domain/repositories/IUserRepository'

interface Request {
  user_id: string
  avatarFilename: string
}

type Response = IUser

@injectable()
export class UpdateUserAvatarService implements Service<Request, Response> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({ avatarFilename, user_id }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fsPromises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fsPromises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    return user
  }
}
