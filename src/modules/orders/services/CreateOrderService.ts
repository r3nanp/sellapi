import { inject, injectable } from 'tsyringe'
import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { IProduct } from '@modules/products/domain/models/Product'
import { IOrder } from '../domain/models/Order'
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository'
import { IProductRepository } from '@modules/products/domain/repositories/ProductsRepository'
import { IOrdersRepository } from '../domain/repositories/OrdersRepository'

interface Request {
  customer_id: string
  products: IProduct[]
}

type Response = IOrder

@injectable()
export class CreateOrderService implements Service<Request, Response> {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
    @inject('OrderRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ products, customer_id }: Request): Promise<Response> {
    const customerExists = await this.customersRepository.findById(customer_id)

    if (!customerExists) {
      throw new AppError('Could not find any products with the given id.')
    }

    const existsProducts = await this.productsRepository.findAllById(products)

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

    const order = await this.ordersRepository.createOrder({
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

    await this.productsRepository.updatedStock(updatedProductQuantity)

    return order
  }
}
