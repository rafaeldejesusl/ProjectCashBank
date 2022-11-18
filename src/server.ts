import "reflect-metadata";
import express from "express";
import "./database";
import accountRouter from "./routes/account.routes";

const app = express();

app.use(accountRouter);

app.listen(3000, () => console.log("Ouvindo na porta 3000"));
