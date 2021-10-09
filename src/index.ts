import express from 'express';

import { env } from './config/env';
import routes from './routes';

import 'reflect-metadata';
import './database/connect';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(env.PORT, () =>
  console.log(`Server started at http://localhost:${env.PORT}`)
);
