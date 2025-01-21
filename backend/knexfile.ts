import type { Knex } from 'knex';
import dotenv from 'dotenv';

const environemnt = process.env.NODE_ENV;

// Load environment variables from .env /
if (environemnt == 'production') {
  dotenv.config({ path: './.env' });
} else if (environemnt == 'development') {
  dotenv.config({ path: './.env.development' });
} else {
  process.exit(1);
}

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 3000,
    ssl: {
      ca: process.env.DB_SSL_CA,
    },
  },
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/database/seeders',
    extension: 'ts',
  },
};

module.exports = config;
