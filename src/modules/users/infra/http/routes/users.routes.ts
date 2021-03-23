import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import { createUserController } from '@modules/users/useCases/CreateUser'
import { searchUserController } from '@modules/users/useCases/SearchUser'
import { userAvatarController } from '@modules/users/useCases/UserAvatar'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', createUserController.create)

usersRouter.use(ensureAuthenticated)
usersRouter.get('/', searchUserController.index)
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update
)

export { usersRouter }
