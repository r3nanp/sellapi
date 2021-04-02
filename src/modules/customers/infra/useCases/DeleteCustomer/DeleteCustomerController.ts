import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { DeleteCustomerService } from '@modules/customers/services/DeleteCustomerService'

export class DeleteCustomerController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteProduct = container.resolve(DeleteCustomerService)

    await deleteProduct.execute(id)

    return response.json([])
  }
}
