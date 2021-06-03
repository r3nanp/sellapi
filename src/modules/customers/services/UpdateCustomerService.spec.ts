import { FakeCustomersRepository } from '../domain/repositories/fakes/FakeCustomerRepository'
import { CreateCustomerService } from './CreateCustomerService'
import { UpdateCustomerService } from './UpdateCustomerService'

describe('Update Customer', () => {
  it('should be able to update customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository()

    const createCustomer = new CreateCustomerService(fakeCustomerRepository)
    const updateCustomer = new UpdateCustomerService(fakeCustomerRepository)

    const createdCustomer = await createCustomer.execute({
      name: 'John Doe',
      email: 'example@example.com'
    })

    const customer = await updateCustomer.execute({
      id: createdCustomer.id,
      name: 'Doe',
      email: 'example1@example1.com'
    })

    expect(customer).toHaveProperty('id')
  })
})
