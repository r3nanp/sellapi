import { Request, Response } from 'express'
import * as yup from 'yup'
import { UpdateProfileService } from '@modules/users/services/UpdateProfileService'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

export class UpdateProfileController {
  async update(request: Request, response: Response): Promise<Response> {
    const id = request.user.id

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(7).optional(),
      old_password: yup.string(),
      password_confirmation: yup
        .mixed()
        .test('match', 'Passwords do not match', function () {
          return this.parent.password === this.parent.password_confirmation
        })
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { name, email, password, old_password } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const updatedUser = await updateProfile.execute({
      id,
      name,
      email,
      password,
      old_password
    })

    return response.json(classToClass(updatedUser))
  }
}
