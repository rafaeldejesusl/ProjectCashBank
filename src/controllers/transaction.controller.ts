import { NextFunction, Response } from 'express';
import { ITokenRequest, ITransactionService } from '../protocols';

export default class TransactionController {
  constructor(private service: ITransactionService) {
    this.service = service;
  }

  async create(req: ITokenRequest, res: Response, _next: NextFunction) {
    try {
      const { creditedUserUsername, value } = req.body;
      const debitedUserId = req.user.id;
      await this.service.create({ debitedUserId, creditedUserUsername, value });

      return res.status(201).end();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCashOutTransaction(req: ITokenRequest, res: Response, _next: NextFunction) {
    try {
      const { id } = req.user;
      const transactions = await this.service.getCashOutTransaction(id);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCashInTransaction(req: ITokenRequest, res: Response, _next: NextFunction) {
    try {
      const { id } = req.user;
      const transactions = await this.service.getCashInTransaction(id);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllTransaction(req: ITokenRequest, res: Response, _next: NextFunction) {
    try {
      const { id } = req.user;
      const transactions = await this.service.getAllTransaction(id);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getByDate(req: ITokenRequest, res: Response, _next: NextFunction) {
    try {
      const { id } = req.user;
      const { dateString } = req.body;
      const date = new Date(dateString);

      const transactions = await this.service.getByDate(id, date);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
