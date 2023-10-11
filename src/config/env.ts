import dotenv from 'dotenv';
dotenv.config();

const env = {
  port: process.env.PORT,
  cookieSecret: process.env.COOKIE_SECRET,
};

export default env;
