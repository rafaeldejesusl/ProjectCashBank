import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import tokenValidate from '../middlewares/tokenValidate';
import transactionValidate from '../middlewares/transactionValidate';
import { ITokenRequest } from '../protocols';
import TransactionService from '../services/transaction.service';

const transactionRouter = Router();
const service = new TransactionService();
const controller = new TransactionController(service);

transactionRouter.post(
  '/transaction',
  tokenValidate,
  transactionValidate,
  (req: ITokenRequest, res, next) => {
    controller.create(req, res, next);
  },
);

transactionRouter.get('/transaction', tokenValidate, (req: ITokenRequest, res, next) => {
  controller.getAllTransaction(req, res, next);
});

transactionRouter.get('/transaction/cashout', tokenValidate, (req: ITokenRequest, res, next) => {
  controller.getCashOutTransaction(req, res, next);
});

transactionRouter.get('/transaction/cashin', tokenValidate, (req: ITokenRequest, res, next) => {
  controller.getCashInTransaction(req, res, next);
});

transactionRouter.post('/transaction/date', tokenValidate, (req: ITokenRequest, res, next) => {
  controller.getByDate(req, res, next);
});

export default transactionRouter;

export { service };
