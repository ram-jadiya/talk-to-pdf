import { Pool, PoolConfig } from 'pg';
import { env } from './env.config';

// Database connection configuration
const dbConfig: PoolConfig = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  max: env.DB_POOL_MAX,
  ssl: {
    ca: env.DB_SSL_CA,
    rejectUnauthorized: true, // Enforce SSL certificate validation
  },
  keepAlive: true, // Keep the connection alive
};

// Create and export the database connection pool
export const dbPool = new Pool(dbConfig);
