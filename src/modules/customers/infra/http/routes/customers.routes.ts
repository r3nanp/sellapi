import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { searchCustomerController } from '@modules/customers/infra/http/useCases/SearchCustomer'
import { showCustomerController } from '@modules/customers/infra/http/useCases/ShowCustomer'
import { createCustomerController } from '@modules/customers/infra/http/useCases/CreateCustomer'
import { updateCustomerController } from '@modules/customers/infra/http/useCases/UpdateCustomer'
import { deleteCustomerController } from '@modules/customers/infra/http/useCases/DeleteCustomer'

const customersRouter = Router()

customersRouter.use(ensureAuthenticated)
customersRouter.get('/', searchCustomerController.search)
customersRouter.get('/:id', showCustomerController.show)

customersRouter.post('/', createCustomerController.create)
customersRouter.put('/:id', updateCustomerController.update)
customersRouter.delete('/:id', deleteCustomerController.delete)

export { customersRouter }
