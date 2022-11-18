import { NextFunction, Request, Response } from "express";
import { IUserService } from "../protocols";

export default class UserController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await this.service.create({ username, password });

      return res.status(201).end();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const token = await this.service.login({ username, password });

      if (!token) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}