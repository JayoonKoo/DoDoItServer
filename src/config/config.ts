import env from './env';

const config = {
  development: {
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    host: env.db.host,
    dialect: 'mysql',
  },
  test: {
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    host: env.db.host,
    dialect: 'mysql',
  },
  production: {
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    host: env.db.host,
    dialect: 'mysql',
  },
};

export default config;
