import { DeleteProductService } from '@modules/products/services/DeleteProductService'
import { Request, Response } from 'express'

export class DeleteProductController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteProduct = new DeleteProductService()

    await deleteProduct.execute(id)

    return response.json([])
  }
}
