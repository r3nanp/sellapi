import { Request, Response } from 'express'
import * as yup from 'yup'
import { CreateSessionService } from '@modules/users/services/CreateSessionService'

export class CreateSessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(7).required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { email, password } = request.body

    const session = new CreateSessionService()

    const sessionCreated = await session.execute({
      email,
      password
    })

    return response.json(sessionCreated)
  }
}
