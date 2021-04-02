import { getCustomRepository } from 'typeorm'
import path from 'path'
import fsPromises from 'fs/promises'
import uploadConfig from '@config/upload'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { User } from '../infra/typeorm/entities/user.entity'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'

interface Request {
  user_id: string
  avatarFilename: string
}

type Response = User

export class UpdateUserAvatarService implements Service<Request, Response> {
  async execute({ avatarFilename, user_id }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findById(user_id)

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

    await usersRepository.save(user)

    return user
  }
}
