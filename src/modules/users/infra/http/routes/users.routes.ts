import { Router } from 'express'

import { createUserController } from '@modules/users/useCases/CreateUser'
import { searchUserController } from '@modules/users/useCases/SearchUser'

const usersRouter = Router()

usersRouter.get('/', searchUserController.index)
usersRouter.post('/', createUserController.create)

export { usersRouter }
