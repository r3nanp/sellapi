import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { searchCustomerController } from '@modules/customers/infra/useCases/SearchCustomer'
import { showCustomerController } from '@modules/customers/infra/useCases/ShowCustomer'
import { createCustomerController } from '@modules/customers/infra/useCases/CreateCustomer'
import { updateCustomerController } from '@modules/customers/infra/useCases/UpdateCustomer'
import { deleteCustomerController } from '@modules/customers/infra/useCases/DeleteCustomer'

const customersRouter = Router()

customersRouter.use(ensureAuthenticated)
customersRouter.get('/', searchCustomerController.search)
customersRouter.get('/:id', showCustomerController.show)

customersRouter.post('/', createCustomerController.create)
customersRouter.put('/', updateCustomerController.update)
customersRouter.delete('/', deleteCustomerController.delete)

export { customersRouter }
