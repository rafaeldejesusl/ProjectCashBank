import { NextFunction, Request, Response } from 'express';
import connectionSource from '../database';
import { User } from '../entities/User';

export const repositoryUser = connectionSource.getRepository(User);

export default async function userValidate(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const checkUser = await repositoryUser.find({
    where: { username },
  });

  if (username.length < 3 || checkUser.length > 0) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  if (password.length < 8 || !(/\d/.test(password)) || !(/[A-Z]/.test(password))) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  return next();
}
