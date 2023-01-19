import { NextFunction, Response, Request } from 'express';
import { ITransactionService } from '../protocols';

export default class TransactionController {
  constructor(private service: ITransactionService) {
    this.service = service;
  }

  async create(req: Request, res: Response, _next: NextFunction) {
    try {
      const { creditedUserUsername, value } = req.body;
      const debitedUserId = res.locals.user.id;
      await this.service.create({ debitedUserId, creditedUserUsername, value });

      return res.status(201).end();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCashOutTransaction(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = res.locals.user;
      const transactions = await this.service.getCashOutTransaction(id);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCashInTransaction(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = res.locals.user;
      const transactions = await this.service.getCashInTransaction(id);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllTransaction(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = res.locals.user;
      const transactions = await this.service.getAllTransaction(id);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getByDate(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = res.locals.user;
      const { dateString } = req.body;
      const date = new Date(dateString);

      const transactions = await this.service.getByDate(id, date);

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
