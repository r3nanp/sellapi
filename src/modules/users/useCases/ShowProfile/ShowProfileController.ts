import { Request, Response } from 'express'
import { ShowProfileService } from '@modules/users/services/ShowProfileService'

export class ShowProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const id = request.user.id

    const showProfile = new ShowProfileService()

    const profile = await showProfile.execute(id)

    return response.json(profile)
  }
}
