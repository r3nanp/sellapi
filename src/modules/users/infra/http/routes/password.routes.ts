import { Router } from 'express'
import { forgotPasswordController } from '@modules/users/useCases/ForgotPassword'
import { resetPasswordController } from '@modules/users/useCases/ResetPassword'

const passwordRouter = Router()

passwordRouter.post('/forgot', forgotPasswordController.create)
passwordRouter.post('/reset', resetPasswordController.create)

export { passwordRouter }
