import 'reflect-metadata'
import { CreateCustomerService } from './CreateCustomerService'
import { SearchCustomerService } from './SearchCustomerService'
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository'

describe('Search Customer', () => {
  it('should be able to list all customers', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository()

    const createCustomer = new CreateCustomerService(fakeCustomerRepository)
    const listCustomers = new SearchCustomerService(fakeCustomerRepository)

    await createCustomer.execute({
      name: 'John Doe',
      email: 'example@example.com'
    })

    await createCustomer.execute({
      name: 'Lisa Doe',
      email: 'lisa@doe.com'
    })

    const customers = await listCustomers.execute()

    expect(customers).toHaveLength(2)
  })
})
