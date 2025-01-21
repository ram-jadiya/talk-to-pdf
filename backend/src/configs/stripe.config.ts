import Stripe from 'stripe';
import { env } from './env.config';

// Initialize Stripe with your secret key
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia',
});
