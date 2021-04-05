import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ShowOrderService } from '@modules/orders/services/ShowOrderService'

export class ShowOrderController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showOrder = container.resolve(ShowOrderService)

    const order = await showOrder.execute(id)

    return response.json(order)
  }
}
