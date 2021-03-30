import { Router } from 'express'

import { createProductController } from '@modules/products/useCases/CreateProduct'
import { searchProductController } from '@modules/products/useCases/SearchProduct'
import { showProductController } from '@modules/products/useCases/ShowProduct'
import { updateProductController } from '@modules/products/useCases/UpdateProduct'
import { deleteProductController } from '@modules/products/useCases/DeleteProduct'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const productsRouter = Router()

productsRouter.get('/', searchProductController.index)
productsRouter.get('/:id', showProductController.show)

productsRouter.use(ensureAuthenticated)
productsRouter.post('/', createProductController.create)
productsRouter.put('/:id', updateProductController.update)
productsRouter.delete('/:id', deleteProductController.delete)

export { productsRouter }
