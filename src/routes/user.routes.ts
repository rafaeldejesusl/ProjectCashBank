import { Router } from 'express';
import UserController from '../controllers/user.controller';
import tokenValidate from '../middlewares/tokenValidate';
import userValidate from '../middlewares/userValidate';
import { ITokenRequest } from '../protocols';
import UserService from '../services/user.service';

const userRouter = Router();
const service = new UserService();
const controller = new UserController(service);

userRouter.post('/user', userValidate, (req, res, next) => {
  controller.create(req, res, next);
});

userRouter.get('/user', tokenValidate, (req: ITokenRequest, res, next) => {
  controller.getBalance(req, res, next);
});

userRouter.post('/login', (req, res, next) => {
  controller.login(req, res, next);
});

export default userRouter;

export { service };
