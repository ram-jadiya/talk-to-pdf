import rateLimit from 'express-rate-limit';

// Define a rate limiting configuration
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes', // Custom message
  standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
