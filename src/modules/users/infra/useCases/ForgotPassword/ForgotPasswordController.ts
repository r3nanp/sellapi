import { Request, Response } from 'express'
import * as yup from 'yup'
import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService'
import { container } from 'tsyringe'

export class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      email: yup.string().email().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { email } = request.body

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    )

    await sendForgotPasswordEmail.execute({
      email
    })

    return response.status(204).json()
  }
}
