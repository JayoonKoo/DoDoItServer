import 'reflect-metadata';
import { DataSource } from 'typeorm';
import env from './config/env';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: true,
  logging: true,
  entities: ['entity/*.js'],
  subscribers: [],
  migrations: [],
});
