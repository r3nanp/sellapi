import { getRepository, Repository } from 'typeorm'
import { UserTokens } from '@modules/users/infra/typeorm/entities/UserTokens.entity'
import { IUserTokens } from '@modules/users/domain/models/UserTokens'
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository'

type Response = UserTokens | undefined

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<IUserTokens>

  constructor() {
    this.ormRepository = getRepository(UserTokens)
  }

  async findByToken(token: string): Promise<Response> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token
      }
    })

    return userToken
  }

  async generate(user_id: string): Promise<UserTokens> {
    const userToken = this.ormRepository.create({
      user_id
    })

    await this.ormRepository.save(userToken)

    return userToken
  }
}
