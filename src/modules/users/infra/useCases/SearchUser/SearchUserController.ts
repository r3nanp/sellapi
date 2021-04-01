import { Request, Response } from 'express'
import { SearchUserService } from '@modules/users/services/SearchUserService'
import { classToClass } from 'class-transformer'

export class SearchUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new SearchUserService()

    const users = await listUsers.execute()

    return response.json(classToClass(users))
  }
}
