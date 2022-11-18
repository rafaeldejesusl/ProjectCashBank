import { Router } from "express";
import UserController from "../controllers/user.controller";
import { userValidate } from "../middlewares/userValidate";
import UserService from "../services/user.service";

const userRouter = Router();
const controller = new UserController( new UserService());

userRouter.post('/user', userValidate, (req, res, next) => {
  controller.create(req, res, next);
});

export default userRouter;
