import { Request, Response } from 'express'
import * as yup from 'yup'
import { ResetPasswordService } from '@modules/users/services/ResetPasswordService'
import { container } from 'tsyringe'

export class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      password: yup.string().min(7).required(),
      password_confirmation: yup
        .mixed()
        .test('match', 'Passwords do not match', function () {
          return this.parent.password === this.parent.password_confirmation
        }),
      token: yup.string().uuid().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { password, token } = request.body

    const resetPassword = container.resolve(ResetPasswordService)

    await resetPassword.execute({
      password,
      token
    })

    return response.status(204).json()
  }
}
