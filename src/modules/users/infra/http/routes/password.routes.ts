import { Router } from 'express'
import { forgotPasswordController } from '@modules/users/infra/useCases/ForgotPassword'
import { resetPasswordController } from '@modules/users/infra/useCases/ResetPassword'

const passwordRouter = Router()

passwordRouter.post('/forgot', forgotPasswordController.create)
passwordRouter.post('/reset', resetPasswordController.create)

export { passwordRouter }
