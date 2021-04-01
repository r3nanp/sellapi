import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import Redis from 'ioredis'
import redis from '@config/redis'
import { AppError } from '@shared/errors/AppError'

const redisClient = new Redis(redis)

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 5,
  duration: 1
})

export async function rateLimiter(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
