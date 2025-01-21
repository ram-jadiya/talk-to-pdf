import OpenAI from 'openai';
import { env } from './env.config';

// Initialize OpenAI client with API key
export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
