import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ShowProductService } from '@modules/products/services/ShowProductService'

export class ShowProductController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showProduct = container.resolve(ShowProductService)

    const product = await showProduct.execute(id)

    return response.json(product)
  }
}
