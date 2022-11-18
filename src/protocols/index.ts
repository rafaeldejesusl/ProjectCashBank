import { Account } from "../entities/Account"

export interface IAccountService {
  getAll(): Promise<Account[]>
}