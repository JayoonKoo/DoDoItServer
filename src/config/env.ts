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
  },
  host: {
    port: parseInt(required('HOST_PORT', '8080')),
    cookieSecret: required('COOKIE_SECRET', 'cookie_secret'),
  },
};

export default env;
