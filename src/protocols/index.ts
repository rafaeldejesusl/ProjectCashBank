import { Request } from 'express';
import { User } from '../entities/User';
import { Transaction } from '../entities/Transaction';

export interface IUserRequest {
  username: string,
  password: string
}

export interface ITokenRequest extends Request {
  user: { username: string, id: string }
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
}
