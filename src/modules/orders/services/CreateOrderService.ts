import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { Order } from '../infra/typeorm/entities/order.entity'
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository'
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository'

interface IProduct {
  id: string
  quantity: number
}

interface Request {
  customer_id: string
  products: IProduct[]
}

type Response = Order

export class CreateOrderService implements Service<Request, Response> {
  async execute({ products, customer_id }: Request): Promise<Response> {
    const ordersRepository = getCustomRepository(OrdersRepository)
    const customersRepository = getCustomRepository(CustomersRepository)
    const productsRepository = getCustomRepository(ProductsRepository)

    const customerExists = await customersRepository.findById(customer_id)

    if (!customerExists) {
      throw new AppError('Could not find any products with the given id.')
    }

    const existsProducts = await productsRepository.findAllById(products)

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.')
    }

    const existsProductsIds = existsProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    )

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`
      )
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity
    )

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
        is not available for ${quantityAvailable[0].id}.`
      )
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }))

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    })

    const { orders_products } = order

    const updatedProductQuantity = orders_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity
    }))

    await productsRepository.save(updatedProductQuantity)

    return order
  }
}
