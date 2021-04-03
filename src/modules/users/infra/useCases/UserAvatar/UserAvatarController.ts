import { Request, Response } from 'express'
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

export class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService)

    const avatar = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(classToClass(avatar))
  }
}
