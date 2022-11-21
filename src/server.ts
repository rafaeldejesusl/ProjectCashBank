import "reflect-metadata";
import "./database";

import { App } from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3000;

new App().start(PORT);
