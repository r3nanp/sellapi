import request from 'supertest'
import { app } from '@shared/infra/http/app'
import PostgresMock from '@shared/tests/PostgresMock'

describe('Users', () => {
  beforeAll(async () => {
    await PostgresMock.connect()
    await PostgresMock.runMigrations()
  })

  afterAll(async () => {
    PostgresMock.getConnection()
    await PostgresMock.dropDatabase()
    await PostgresMock.disconnect()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
      password: '1234567@'
    })

    expect(response.status).toBe(201)
  })

  it('Should not be able to create a user with exists email', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
      password: '1234567@'
    })

    expect(response.status).toBe(400)
  })
})
