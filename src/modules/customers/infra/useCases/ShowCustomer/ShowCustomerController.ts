import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ShowCustomerService } from '@modules/customers/services/ShowCustomerService'

export class ShowCustomerController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showCustomer = container.resolve(ShowCustomerService)

    const customers = await showCustomer.execute(id)

    return response.json(customers)
  }
}
