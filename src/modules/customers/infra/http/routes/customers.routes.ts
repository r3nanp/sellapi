import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { searchCustomerController } from '@modules/customers/useCases/SearchCustomer'
import { showCustomerController } from '@modules/customers/useCases/ShowCustomer'
import { createCustomerController } from '@modules/customers/useCases/CreateCustomer'
import { updateCustomerController } from '@modules/customers/useCases/UpdateCustomer'
import { deleteCustomerController } from '@modules/customers/useCases/DeleteCustomer'

const customersRouter = Router()

customersRouter.use(ensureAuthenticated)
customersRouter.get('/', searchCustomerController.search)
customersRouter.get('/:id', showCustomerController.show)

customersRouter.post('/', createCustomerController.create)
customersRouter.put('/', updateCustomerController.update)
customersRouter.delete('/', deleteCustomerController.delete)

export { customersRouter }
