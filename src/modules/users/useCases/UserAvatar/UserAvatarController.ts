import { Request, Response } from 'express'
import * as yup from 'yup'
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'

export class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      avatar: yup.string().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const updateAvatar = new UpdateUserAvatarService()

    const avatar = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(avatar)
  }
}
