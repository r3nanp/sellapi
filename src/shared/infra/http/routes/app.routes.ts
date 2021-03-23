import { Router } from 'express'

import { productsRouter } from '@modules/products/infra/http/routes/product.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/session.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export { routes }
