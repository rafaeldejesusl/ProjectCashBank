import { User } from '../entities/User';
import { Transaction } from '../entities/Transaction';

export interface IUserRequest {
  username: string,
  password: string
}

export interface IUserBalance {
  username: string,
  balance: number
}

export interface IUserService {
  create(user: IUserRequest): Promise<User>,
  login(user: IUserRequest): Promise<string | null>,
  getBalance(username: string): Promise<IUserBalance>
}

export interface ITransactionRequest {
  debitedUserId: string,
  creditedUserUsername: string,
  value: number
}

export interface ITransactionService {
  create(tansaction: ITransactionRequest): Promise<Transaction>
  getCashOutTransaction(id: string): Promise<Transaction[]>
  getCashInTransaction(id: string): Promise<Transaction[]>
  getAllTransaction(id: string): Promise<Transaction[]>
  getByDate(id: string, date: Date): Promise<Transaction[]>
}
