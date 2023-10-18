import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import env from './config/env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(cookieParser(env.host.cookieSecret));

app.listen(env.host.port, () => {
  console.log(`${env.host.port} 포트에서 서버 실행중`);
});
