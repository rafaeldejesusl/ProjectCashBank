import { Repository } from "typeorm";
import connectionSource from "../database";
import { Account } from "../entities/Account";
import { User } from "../entities/User";
import { IUserService, IUserRequest } from "../protocols";

export default class UserService implements IUserService {
  repositoryAccount: Repository<Account>
  repositoryUser: Repository<User>
  constructor() {
    this.repositoryAccount = connectionSource.getRepository(Account);
    this.repositoryUser = connectionSource.getRepository(User);
  }

  async create(user: IUserRequest): Promise<User> {
    const account = this.repositoryAccount.create({ balance: 100.00 });
    await this.repositoryAccount.save(account);

    const newUser = this.repositoryUser.create({
      username: user.username,
      password: user.password,
      accountId: account.id
    });
    await this.repositoryUser.save(newUser);

    return newUser;
  }
}
