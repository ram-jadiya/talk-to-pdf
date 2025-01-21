import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env /
if (process.env.NODE_ENV == 'production') {
  dotenv.config({ path: './.env' });
} else if (process.env.NODE_ENV == 'development') {
  dotenv.config({ path: './.env.development' });
} else if (process.env.NODE_ENV == 'stage') {
  dotenv.config({ path: './.env.stage' });
} else {
  process.exit(1);
}

// Define the environment schema with Zod
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Server configuration
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  HOST: z.string().default('localhost'),

  // Database configuration
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().min(1).max(65535),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_POOL_MAX: z.coerce.number().min(1).max(100).default(20),
  DB_SSL_CA: z.string().min(1),

  // JWT configuration
  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRATION: z
    .string()
    .regex(/^\d+[hdwmy]$/)
    .default('24h'), // e.g., 24h, 7d, 1w
  REFRESH_TOKEN_EXPIRATION: z
    .string()
    .regex(/^\d+[hdwmy]$/)
    .default('24h'), // e.g., 24h, 7d, 1w

  // redis configuration
  REDIS_URL: z.string().min(1),

  // pinecone configuration
  PINECONE_API_KEY: z.string().min(1),
  PINECONE_URL: z.string().min(1),

  // openai configuration
  OPENAI_API_KEY: z.string().min(1),

  // aws configuration
  AWS_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_LOG_GROUP_NAME: z.string().min(1),
  AWS_S3_BUCKET_NAME: z.string().min(1),
  AWS_S3_BASE_URL: z.string().min(1),

  // google confugration
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().min(1),

  // Smtp configuration
  SMTP_HOST: z.string().min(1),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),

  // Stripe credentials
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  PAYMENT_SUCCESS_URL: z.string().min(1),
  PAYMENT_CANCEL_URL: z.string().min(1),
});

// Create a type from the schema
type Env = z.infer<typeof envSchema>;

// Validate environment variables and export them
function validateEnv(): Env {
  try {
    const env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      HOST: process.env.HOST,

      // Database
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_POOL_MAX: process.env.DB_POOL_MAX,
      DB_SSL_CA: process.env.DB_SSL_CA,

      // JWT
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
      REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,

      // Redis
      REDIS_URL: process.env.REDIS_URL,

      // Pincone
      PINECONE_API_KEY: process.env.PINECONE_API_KEY,
      PINECONE_URL: process.env.PINECONE_URL,

      // Openai
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,

      // Aws
      AWS_REGION: process.env.AWS_REGION,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_LOG_GROUP_NAME: process.env.AWS_LOG_GROUP_NAME,
      AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
      AWS_S3_BASE_URL: process.env.AWS_S3_BASE_URL,

      // google
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,

      // Smtp
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,

      // Stripe
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      PAYMENT_SUCCESS_URL: process.env.PAYMENT_SUCCESS_URL,
      PAYMENT_CANCEL_URL: process.env.PAYMENT_CANCEL_URL,
    });

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((issue) => {
        return `${issue.path.join('.')}: ${issue.message}`;
      });

      console.error('\n🔥 Invalid environment variables:');
      errorMessages.forEach((message) => {
        console.error(`  ❌ ${message}`);
      });
      console.error('\nFix the above errors and restart the application.\n');
    } else {
      console.error(
        '\n🔥 An unknown error occurred while validating environment variables:',
        error
      );
    }

    process.exit(1);
  }
}

export const env = validateEnv();

export type { Env };
