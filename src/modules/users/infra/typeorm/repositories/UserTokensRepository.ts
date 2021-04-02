import { EntityRepository, Repository } from 'typeorm'
import { UserTokens } from '@modules/users/infra/typeorm/entities/UserTokens.entity'

type Response = UserTokens | undefined

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  async findByToken(token: string): Promise<Response> {
    const userToken = await this.findOne({
      where: {
        token
      }
    })

    return userToken
  }

  async generate(user_id: string): Promise<UserTokens> {
    const userToken = this.create({
      user_id
    })

    await this.save(userToken)

    return userToken
  }
}
