import { UpdateCustomerService } from '@modules/customers/services/UpdateCustomerService'
import { Request, Response } from 'express'
import * as yup from 'yup'

export class UpdateCustomerController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const schema = yup.object().shape({
      name: yup.string().min(3).required(),
      email: yup.string().email().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { name, email } = request.body

    const updateCustomer = new UpdateCustomerService()

    const customer = await updateCustomer.execute({
      id,
      name,
      email
    })

    return response.json(customer)
  }
}
