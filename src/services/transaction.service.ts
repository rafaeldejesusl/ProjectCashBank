import { Repository } from 'typeorm';
import connectionSource from '../database';
import { Account } from '../entities/Account';
import { User } from '../entities/User';
import { Transaction } from '../entities/Transaction';
import { ITransactionRequest, ITransactionService } from '../protocols';

export default class TansactionService implements ITransactionService {
  repositoryTransaction: Repository<Transaction>;
  repositoryUser: Repository<User>;
  repositoryAccount: Repository<Account>;
  constructor() {
    this.repositoryTransaction = connectionSource.getRepository(Transaction);
    this.repositoryUser = connectionSource.getRepository(User);
    this.repositoryAccount = connectionSource.getRepository(Account);
  }

  async create(transaction: ITransactionRequest): Promise<Transaction> {
    const { debitedUserId, creditedUserUsername, value } = transaction;
    const debited = await this.repositoryUser.find({ where: { id: debitedUserId } });
    const credited = await this.repositoryUser.find({ where: { username: creditedUserUsername } });
    const debitedAcc = await this.repositoryAccount.find({ where: { id: debited[0].accountId } });
    const creditedAcc = await this.repositoryAccount.find({ where: { id: credited[0].accountId } });

    debitedAcc[0].balance = Number(debitedAcc[0].balance) - Number(value);
    creditedAcc[0].balance = Number(creditedAcc[0].balance) + Number(value);

    const newTransaction = this.repositoryTransaction.create({
      debitedAccountId: debited[0].accountId,
      creditedAccountId: credited[0].accountId,
      value,
    });

    await this.repositoryAccount.save(debitedAcc[0]);
    await this.repositoryAccount.save(creditedAcc[0]);
    await this.repositoryTransaction.save(newTransaction);

    return newTransaction;
  }

  async getCashOutTransaction(id: string): Promise<Transaction[]> {
    const debited = await this.repositoryUser.find({ where: { id } });
    const transactions = await this.repositoryTransaction.find({
      where: { debitedAccountId: debited[0].accountId },
    });

    return transactions;
  }

  async getCashInTransaction(id: string): Promise<Transaction[]> {
    const credited = await this.repositoryUser.find({ where: { id } });
    const transactions = await this.repositoryTransaction.find({
      where: { creditedAccountId: credited[0].accountId },
    });

    return transactions;
  }

  async getAllTransaction(id: string): Promise<Transaction[]> {
    const user = await this.repositoryUser.find({ where: { id } });
    const outTransaction = await this.repositoryTransaction.find({
      where: { debitedAccountId: user[0].accountId },
    });
    const inTransaction = await this.repositoryTransaction.find({
      where: { creditedAccountId: user[0].accountId },
    });

    const allTransactions = [...outTransaction, ...inTransaction];
    const transactions = allTransactions.sort((a, b) => {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });

    return transactions;
  }
}
