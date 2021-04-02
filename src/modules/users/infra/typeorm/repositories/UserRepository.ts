import { EntityRepository, Repository } from 'typeorm'
import { User } from '@modules/users/infra/typeorm/entities/user.entity'

type Response = User | undefined

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByName(name: string): Promise<Response> {
    const user = await this.findOne({
      where: {
        name
      }
    })

    return user
  }

  async findByEmail(email: string): Promise<Response> {
    const user = await this.findOne({
      where: {
        email
      }
    })

    return user
  }

  async findById(id: string): Promise<Response> {
    const user = await this.findOne({
      where: {
        id
      }
    })

    return user
  }
}
