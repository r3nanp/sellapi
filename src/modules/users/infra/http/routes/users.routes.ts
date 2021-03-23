import { Router } from 'express'

import { createUserController } from '@modules/users/useCases/CreateUser'
import { searchUserController } from '@modules/users/useCases/SearchUser'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()

usersRouter.post('/', createUserController.create)

usersRouter.use(ensureAuthenticated)
usersRouter.get('/', searchUserController.index)

export { usersRouter }
