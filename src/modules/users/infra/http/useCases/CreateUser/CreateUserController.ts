import { Request, Response } from 'express'
import * as yup from 'yup'
import { CreateUserService } from '@modules/users/services/CreateUserService'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

export class CreateUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(7).required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return response.status(201).json(classToClass(user))
  }
}
