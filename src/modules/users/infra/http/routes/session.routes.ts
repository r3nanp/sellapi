import { Router } from 'express'
import { createSessionController } from '@modules/users/infra/http/useCases/CreateSession'

const sessionsRouter = Router()

sessionsRouter.post('/', createSessionController.create)

export { sessionsRouter }
