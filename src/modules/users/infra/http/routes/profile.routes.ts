import { Router } from 'express'
import { showProfileController } from '@modules/users/useCases/ShowProfile'
import { updateProfileController } from '@modules/users/useCases/UpdateProfile'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const profileRouter = Router()

profileRouter.use(ensureAuthenticated)
profileRouter.get('/', showProfileController.show)
profileRouter.put('/', updateProfileController.update)

export { profileRouter }
