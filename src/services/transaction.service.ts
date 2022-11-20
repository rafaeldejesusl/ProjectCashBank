import { Repository } from "typeorm";
import  connectionSource from "../database";
import { Account } from "../entities/Account";
import { User } from "../entities/User";
import { Transaction } from "../entities/Transaction";
import { ITransactionRequest, ITransactionService } from "../protocols";

export default class TansactionService implements ITransactionService {
  repositoryTransaction: Repository<Transaction>
  repositoryUser: Repository<User>
  repositoryAccount: Repository<Account>
  constructor() {
    this.repositoryTransaction = connectionSource.getRepository(Transaction);
    this.repositoryUser = connectionSource.getRepository(User);
    this.repositoryAccount = connectionSource.getRepository(Account);
  }

  async create(transaction: ITransactionRequest): Promise<Transaction> {
    const { debitedUserId, creditedUserUsername, value } = transaction;
    const debited = await this.repositoryUser.find({ where: { id: debitedUserId } });
    const credited = await this.repositoryUser.find({ where: { username: creditedUserUsername } });
    const debitedAccount = await this.repositoryAccount.find({ where: { id: debited[0].accountId } });
    const creditedAccount = await this.repositoryAccount.find({ where: { id: credited[0].accountId } });

    debitedAccount[0].balance = Number(debitedAccount[0].balance) - Number(value);
    creditedAccount[0].balance = Number(creditedAccount[0].balance) + Number(value);

    const newTransaction = this.repositoryTransaction.create({
      debitedAccountId: debited[0].accountId,
      creditedAccountId: credited[0].accountId,
      value
    });

    await this.repositoryAccount.save(debitedAccount[0]);
    await this.repositoryAccount.save(creditedAccount[0]);
    await this.repositoryTransaction.save(newTransaction);

    return newTransaction;
  }
}
