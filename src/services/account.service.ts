import { Repository } from "typeorm";
import connectionSource from "../database";
import { Account } from "../entities/Account";
import { IAccountService } from "../protocols";

export default class AccountService implements IAccountService {
  model: Repository<Account>;
  constructor() {
    this.model = connectionSource.getRepository(Account);
  }

  async getAll(): Promise<Account[]> {
    const accounts = await this.model.find();

    return accounts;
  }
}