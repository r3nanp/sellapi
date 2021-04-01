import { Router } from 'express'

import { createProductController } from '@modules/products/infra/useCases/CreateProduct'
import { searchProductController } from '@modules/products/infra/useCases/SearchProduct'
import { showProductController } from '@modules/products/infra/useCases/ShowProduct'
import { updateProductController } from '@modules/products/infra/useCases/UpdateProduct'
import { deleteProductController } from '@modules/products/infra/useCases/DeleteProduct'

const productsRouter = Router()

productsRouter.get('/', searchProductController.index)
productsRouter.get('/:id', showProductController.show)

productsRouter.post('/', createProductController.create)
productsRouter.put('/:id', updateProductController.update)
productsRouter.delete('/:id', deleteProductController.delete)

export { productsRouter }
