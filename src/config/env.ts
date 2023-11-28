import dotenv from 'dotenv';
dotenv.config();

function required<T>(key: string, defaultValue?: T) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const env = {
  db: {
    username: required('DB_USERNAME', 'dbusername'),
    password: required('DB_PASSWORD', 'dbpassword'),
    database: required('DB_DATABASE', 'dbdatabase'),
    host: required('DB_HOST', 'dbhost'),
    port: parseInt(required('DB_PORT', '3306')),
  },
  host: {
    port: parseInt(required('HOST_PORT', '8080')),
    cookieSecret: required('COOKIE_SECRET', 'cookie_secret'),
    origin: required('ORIGIN', 'origin'),
  },
  bcrypt: {
    saltRounds: parseInt(required('SALT_ROUNDS', '0')),
  },
  jwt: {
    scretKey: required('JWT_SECRET', 'jwt_scret'),
    refreshKey: required('JWT_REFRESH', 'jwt_refresh'),
    expiresIn: parseInt(required('JWT_EXPIRES_IN', '0')),
    expiresRefresh: parseInt(required('JWT_EXPIRES_REFRESH', '0')),
  },
};

export default env;
