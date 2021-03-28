import { Request, Response } from 'express'
import * as yup from 'yup'
import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService'

export class CreateCustomerController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { name, email } = request.body

    const createCustomer = new CreateCustomerService()

    const customer = await createCustomer.execute({
      name,
      email
    })

    return response.status(201).json(customer)
  }
}
