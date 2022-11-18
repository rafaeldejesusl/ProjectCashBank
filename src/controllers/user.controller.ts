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
      next(error)
    }
  }
}