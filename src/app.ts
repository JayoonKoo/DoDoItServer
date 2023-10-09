import express from 'express';
import env from './config/env';

const app = express();

app.listen(env.port, () => {
  console.log('서버 실행');
});
