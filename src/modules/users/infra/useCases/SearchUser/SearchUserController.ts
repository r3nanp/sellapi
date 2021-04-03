import { Request, Response } from 'express'
import { SearchUserService } from '@modules/users/services/SearchUserService'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

export class SearchUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(SearchUserService)

    const users = await listUsers.execute()

    return response.json(classToClass(users))
  }
}
