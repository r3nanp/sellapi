import { Request, Response } from 'express'
import { SearchUserService } from '@modules/users/services/SearchUserService'

export class SearchUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new SearchUserService()

    const users = await listUsers.execute()

    return response.json(users)
  }
}
