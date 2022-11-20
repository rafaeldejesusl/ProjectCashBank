import "reflect-metadata";
import express from "express";
import "./database";
import accountRouter from "./routes/account.routes";
import userRouter from "./routes/user.routes";
import transactionRouter from "./routes/transaction.routes";

const app = express();

app.use(express.json());

app.use(accountRouter);

app.use(userRouter);

app.use(transactionRouter);

app.listen(3000, () => console.log("Ouvindo na porta 3000"));
