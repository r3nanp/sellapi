import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { IOrdersRepository } from '../domain/repositories/OrdersRepository'
import { IOrder } from '../domain/models/Order'

type Request = string

type Response = IOrder

@injectable()
export class ShowOrderService implements Service<Request, Response> {
  constructor(
    @inject('OrderRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(id: Request): Promise<Response> {
    const order = await this.ordersRepository.findById(id)

    if (!order) {
      throw new AppError('Order not found.')
    }

    return order
  }
}
