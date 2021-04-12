import 'reflect-metadata'
import { FakeCustomersRepository } from '../domain/repositories/fakes/FakeCustomerRepository'
import { CreateCustomerService } from './CreateCustomerService'
import { ShowCustomerService } from './ShowCustomerService'
import { AppError } from '@shared/errors/AppError'

describe('Show Customer', () => {
  it('should be able to show only one customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository()

    const createCustomer = new CreateCustomerService(fakeCustomerRepository)

    const customer = await createCustomer.execute({
      name: 'John Doe',
      email: 'example@example.com'
    })

    const listCustomer = new ShowCustomerService(fakeCustomerRepository)

    await listCustomer.execute(customer.id)

    expect(listCustomer).toHaveLength(1)
  })

  it('should not be able to show one customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository()

    const listCustomer = new ShowCustomerService(fakeCustomerRepository)

    expect(
      await listCustomer.execute('d954b7c0-e5ea-46a4-be79-74920c3c620d')
    ).rejects.toBeInstanceOf(AppError)
  })
})
