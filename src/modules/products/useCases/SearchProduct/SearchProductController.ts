import { SearchProductService } from '@modules/products/services/SearchProductService'
import { Request, Response } from 'express'

export class SearchProductController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new SearchProductService()

    const products = await listProducts.execute()

    return response.json(products)
  }
}
