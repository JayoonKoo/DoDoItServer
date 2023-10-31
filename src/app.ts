import express, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import env from './config/env';
import { AppDataSource } from './data-source';
import authRouter from './router/authRouter';
import Res from './lib/Res';

const app = express();

app.use(express.json());
app.use(helmet());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(morgan('tiny'));
app.use(cookieParser(env.host.cookieSecret));

// router
app.use('/auth', authRouter);

// not found
app.use((req, res) => {
  return res.sendStatus(404);
});
// server Error Router
const errRouter: ErrorRequestHandler = (err, req, res) => {
  console.error(err);
  const body = process.env.NODE_ENV == 'production' ? {} : err;
  return res.status(500).send(new Res({ body }));
};
app.use(errRouter);

app.listen(env.host.port, () => {
  console.log(`${env.host.port} 포트에서 서버 실행중`);
  AppDataSource.initialize()
    .then(() => console.log('DB initialize'))
    .catch(console.error);
});
