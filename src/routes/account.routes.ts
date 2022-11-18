import { Router } from "express";
import AccountController from "../controllers/account.controller";
import AccountService from "../services/account.service";

const accountRouter = Router();
const controller = new AccountController( new AccountService());

accountRouter.get('/account', (req, res, next) => {
  controller.getAll(req, res, next);
});

export default accountRouter;