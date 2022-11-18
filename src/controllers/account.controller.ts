import { NextFunction, Request, Response } from "express";
import { IAccountService } from "../protocols";

export default class AccountController {
  constructor(private service: IAccountService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await this.service.getAll();

      return res.status(200).json(accounts);
    } catch (error) {
      next(error)
    }
  }
}