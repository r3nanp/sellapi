import { Router } from 'express'
import { showOrderController } from '@modules/orders/infra/http/useCases/ShowOrder'
import { createOrderController } from '@modules/orders/infra/http/useCases/CreateOrder'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const ordersRouter = Router()

ordersRouter.use(ensureAuthenticated)
ordersRouter.get('/:id', showOrderController.show)
ordersRouter.post('/', createOrderController.create)

export { ordersRouter }
