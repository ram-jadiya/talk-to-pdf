import { createClient } from 'redis';
import { env } from './env.config';

// Create and configure Redis client with the provided URL
const cache = createClient({
  url: env.REDIS_URL,
});

// Handle any connection errors
cache.on('error', (err) => {
  throw err;
});

// Connect to Redis and log success or failure
cache
  .connect()
  .then(() => {
    console.log(`========================================`);
    console.log(`🎉 Redis Connection Successful! 🎉`);
    console.log(`========================================`);
  })
  .catch((e) => {
    console.error(e); // Log error on failure
    process.exit(1); // Exit process if connection fails
  });

export { cache };
