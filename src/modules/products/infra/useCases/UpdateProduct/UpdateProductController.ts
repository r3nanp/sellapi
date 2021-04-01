import { Request, Response } from 'express'
import { UpdateProductService } from '@modules/products/services/UpdateProductService'
import * as yup from 'yup'

export class UpdateProductController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

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

    const updateProduct = new UpdateProductService()

    const product = await updateProduct.execute({ id, name, price, quantity })

    return response.json(product)
  }
}
