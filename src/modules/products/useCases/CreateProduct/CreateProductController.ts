import { CreateProductService } from '@modules/products/services/CreateProductService'
import { Request, Response } from 'express'
import * as yup from 'yup'

export class CreateProductController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      name: yup.string().min(4).required(),
      price: yup.number().required(),
      quantity: yup.number().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const { name, price, quantity } = request.body

    const createProduct = new CreateProductService()

    const product = await createProduct.execute({
      name,
      price,
      quantity
    })

    return response.status(201).json(product)
  }
}
