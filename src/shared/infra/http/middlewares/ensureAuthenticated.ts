import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import auth from '@config/auth'

export function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): void | Error {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing.')
  }

  const [, token] = authHeader.split(' ')

  try {
    jwt.verify(token, auth.secret)

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 501)
  }
}
