import { Repository } from "typeorm";
import connectionSource from "../database";
import { Account } from "../entities/Account";
import { User } from "../entities/User";
import { IUserService, IUserRequest, IUserBalance } from "../protocols";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || 'jwt_secret';
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d'
} as jwt.SignOptions;

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
    const hashedPassword = bcrypt.hashSync(user.password, 10);

    const newUser = this.repositoryUser.create({
      username: user.username,
      password: hashedPassword,
      accountId: account.id
    });
    await this.repositoryUser.save(newUser);

    return newUser;
  }

  async login(user: IUserRequest): Promise<string | null> {
    const { username, password } = user;
    const storedUser = await this.repositoryUser.find({ where: { username: username } });

    if (storedUser.length === 0) {
      return null;
    }

    const myUser = storedUser[0];
    const check = bcrypt.compareSync(password, myUser.password);

    if (!check) {
      return null;
    }

    const token = jwt.sign({ username }, secret, jwtConfig);
    return token;
  }

  async getBalance(username: string): Promise<IUserBalance> {
    const user = await this.repositoryUser.find({ where: { username: username } });
    const account = await this.repositoryAccount.find({ where: { id: user[0].accountId } });

    return { username, balance: account[0].balance };
  }
}
