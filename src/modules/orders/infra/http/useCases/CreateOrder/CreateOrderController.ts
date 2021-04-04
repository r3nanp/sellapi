import { Request, Response } from 'express'
import * as yup from 'yup'
import { CreateOrderService } from '@modules/orders/services/CreateOrderService'

export class CreateOrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      customer_id: yup.string().uuid().required(),
      products: yup.array(
        yup.object().shape({
          quantity: yup.number().integer().required()
        })
      )
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { customer_id, products } = request.body

    const createOrder = new CreateOrderService()

    const order = await createOrder.execute({
      customer_id,
      products
    })

    return response.status(201).json(order)
  }
}
