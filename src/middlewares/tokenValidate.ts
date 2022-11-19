import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ITokenRequest } from "../protocols";

const secret = process.env.JWT_SECRET || 'jwt_secret';

export async function tokenValidate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token is required' });

  const payload = jwt.verify(authorization, secret);
  req['user'] = payload;

  return next();
}