import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { Order } from '../infra/typeorm/entities/order.entity'
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository'
import { AppError } from '@shared/errors/AppError'

type Request = string

type Response = Order

export class ShowOrderService implements Service<Request, Response> {
  async execute(id: Request): Promise<Response> {
    const ordersRepository = getCustomRepository(OrdersRepository)

    const order = await ordersRepository.findById(id)

    if (!order) {
      throw new AppError('Order not found.')
    }

    return order
  }
}
