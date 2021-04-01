import Redis, { Redis as RedisClient } from 'ioredis'
import redis from '@config/redis'

export class RedisCache {
  private client: RedisClient

  constructor() {
    this.client = new Redis(redis)
  }

  async save(key: string, value: unknown): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data) as T

    return parsedData
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }
}
