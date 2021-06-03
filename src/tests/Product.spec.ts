import request from 'supertest'
import { app } from '@shared/infra/http/app'
import PostgresMock from '@shared/tests/PostgresMock'

describe('Products', () => {
  beforeAll(async () => {
    await PostgresMock.connect()
    await PostgresMock.runMigrations()
  })

  afterEach(async () => {
    PostgresMock.getConnection()
    await PostgresMock.query('DELETE FROM PRODUCTS')
  })

  afterAll(async () => {
    PostgresMock.getConnection()
    await PostgresMock.dropDatabase()
    await PostgresMock.disconnect()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Mouse',
      price: 50,
      quantity: 2
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list a product', async () => {
    await request(app).post('/products').send({
      name: 'Mouse',
      price: 50,
      quantity: 2
    })

    await request(app).post('/products').send({
      name: 'Book',
      price: 30,
      quantity: 3
    })

    const response = await request(app).get('/products')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
  })
})
