import 'reflect-metadata'
import { CreateCustomerService } from './CreateCustomerService'
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository'
import { AppError } from '@shared/errors/AppError'

describe('Create Customer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository()

    const createCustomer = new CreateCustomerService(fakeCustomerRepository)

    const customer = await createCustomer.execute({
      name: 'John Doe',
      email: 'example@example.com'
    })

    expect(customer).toHaveProperty('id')
  })

  it('should not be able to create two customers with the same email', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository()

    const createCustomer = new CreateCustomerService(fakeCustomerRepository)

    await createCustomer.execute({
      name: 'John Doe',
      email: 'example@example.com'
    })

    expect(
      createCustomer.execute({
        name: 'John Doe',
        email: 'example@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
