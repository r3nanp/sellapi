import { SearchProductService } from '@modules/products/services/SearchProductService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class SearchProductController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(SearchProductService)

    const products = await listProducts.execute()

    return response.json(products)
  }
}
