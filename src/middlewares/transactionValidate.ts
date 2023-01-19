import { NextFunction, Response, Request } from 'express';
import connectionSource from '../database';
import { Account } from '../entities/Account';
import { User } from '../entities/User';

export const repositoryUser = connectionSource.getRepository(User);
export const repositoryAccount = connectionSource.getRepository(Account);

async function transactionValidate(req: Request, res: Response, next: NextFunction) {
  const { creditedUserUsername, value } = req.body;
  const debitedUserId = res.locals.user.id;

  if (!creditedUserUsername || !value) {
    return res.status(400).json({ message: 'Required creditedAccountId and value' });
  }

  const debited = await repositoryUser.find({ where: { id: debitedUserId } });
  const credited = await repositoryUser.find({ where: { username: creditedUserUsername } });

  if (debited.length < 1 || credited.length < 1 || debitedUserId === credited[0].id) {
    return res.status(400).json({ message: 'Invalid transaction' });
  }

  const debitedAccount = await repositoryAccount.find({ where: { id: debited[0].accountId } });

  if (debitedAccount[0].balance < value) {
    return res.status(400).json({ message: 'Transaction value bigger than balance' });
  }

  return next();
}

export default transactionValidate;
