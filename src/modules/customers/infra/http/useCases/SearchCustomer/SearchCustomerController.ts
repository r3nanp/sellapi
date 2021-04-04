import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { SearchCustomerService } from '@modules/customers/services/SearchCustomerService'

export class SearchCustomerController {
  async search(request: Request, response: Response): Promise<Response> {
    const searchCustomers = container.resolve(SearchCustomerService)

    const customers = await searchCustomers.execute()

    return response.json(customers)
  }
}
