import { IUser } from '../models/User'

type ICreateUser = Pick<IUser, 'name' | 'password' | 'email'>

type Response = IUser | undefined

export interface IUserRepository {
  findByName(name: string): Promise<Response>
  findByEmail(email: string): Promise<Response>
  findById(id: string): Promise<Response>
  create(data: ICreateUser): Promise<IUser>
  save(user: IUser): Promise<IUser>
  findAll(): Promise<IUser[]>
}
