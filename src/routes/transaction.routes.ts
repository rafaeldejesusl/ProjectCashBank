import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";
import { tokenValidate } from "../middlewares/tokenValidate";
import { transactionValidate } from "../middlewares/transactionValidate";
import { ITokenRequest } from "../protocols";
import TransactionService from "../services/transaction.service";

const transactionRouter = Router();
const controller = new TransactionController(new TransactionService());

transactionRouter.post('/transaction', tokenValidate, transactionValidate, (req: ITokenRequest, res, next) => {
  controller.create(req, res, next);
});

export default transactionRouter;
