import { Account } from "../entities/Account"
import { User } from "../entities/User"

export interface IAccountService {
  getAll(): Promise<Account[]>
}

export interface IUserRequest {
  username: string,
  password: string
}

export interface IUserService {
  create(user: IUserRequest): Promise<User>,
  login(user: IUserRequest): Promise<string | null>
}
