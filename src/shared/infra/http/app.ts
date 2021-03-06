import 'reflect-metadata'
import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express'
import '@shared/container'
import cors from 'cors'
import 'express-async-errors'

import '@shared/infra/typeorm/createConnection'
import { routes } from './routes/app.routes'
import { AppError } from '@shared/errors/AppError'
import { rateLimiter } from './middlewares/rateLimiter'
import uploadConfig from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json())
app.use(rateLimiter)

app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    _next: NextFunction
  ): Response => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error.stack)
    }

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
)

export { app }
