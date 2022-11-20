import { NextFunction, Response } from "express";
import connectionSource from "../database";
import { ITokenRequest } from "../protocols";
import { Account } from "../entities/Account";
import { User } from "../entities/User";

export async function transactionValidate(req: ITokenRequest, res: Response, next: NextFunction) {
  const { creditedUserUsername, value } = req.body;
  const debitedUserId = req.user.id;
  const repositoryUser = connectionSource.getRepository(User);
  const repositoryAccount = connectionSource.getRepository(Account);
  
  if (!creditedUserUsername || !value) {
    return res.status(400).json({ message: 'Required creditedAccountId and value' });
  }

  const debited = await repositoryUser.find({ where: { id: debitedUserId } });
  const credited = await repositoryUser.find({ where: { username: creditedUserUsername } });

  if (debitedUserId === credited[0].id || debited.length === 0 || credited.length == 0) {
    return res.status(400).json({ message: 'Invalid transaction' });
  }

  const debitedAccount = await repositoryAccount.find({ where: { id: debited[0].accountId } });

  if (debitedAccount[0].balance < value) {
    return res.status(400).json({ message: 'Transaction value bigger than balance' });
  }

  return next();
}