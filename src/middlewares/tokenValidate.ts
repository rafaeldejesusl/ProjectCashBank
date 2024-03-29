import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default async function tokenValidate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token is required' });

  try {
    const payload = jwt.verify(authorization, secret);
    res.locals.user = payload;

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
