import { IUserTokens } from '../models/UserTokens'

type Response = IUserTokens | undefined

export interface IUserTokensRepository {
  findByToken(token: string): Promise<Response>
  generate(user_id: string): Promise<IUserTokens>
}
