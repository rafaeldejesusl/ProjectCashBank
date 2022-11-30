import { NextFunction, Request, Response } from "express";
import { ITokenRequest, ITransactionService } from "../protocols";

export default class TransactionController {
  constructor(private service: ITransactionService) {
    this.service;
  }

  async create(req: ITokenRequest, res: Response, next: NextFunction) {
    try {
      const { creditedUserUsername, value } = req.body;
      const debitedUserId = req.user.id;
      const transaction = await this.service.create({ debitedUserId, creditedUserUsername, value });

      return res.status(201).end();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCashOutTransaction(req: ITokenRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const transactions = await this.service.getCashOutTransaction(id);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}