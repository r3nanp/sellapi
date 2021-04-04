import { Request, Response } from 'express'
import { ShowProfileService } from '@modules/users/services/ShowProfileService'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

export class ShowProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const id = request.user.id

    const showProfile = container.resolve(ShowProfileService)

    const profile = await showProfile.execute(id)

    return response.json(classToClass(profile))
  }
}
