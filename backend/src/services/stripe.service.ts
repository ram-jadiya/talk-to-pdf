import Stripe from 'stripe';
import { stripe } from '../configs/stripe.config';
import { env } from '../configs/env.config';

/**
 * @class StripeService
 * Handles Stripe communication
 */
export class StripeService {
  private static instance: StripeService;

  private constructor() {}

  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    userId: number
  ): Promise<Stripe.PaymentIntent> {
    return stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        userId: userId.toString(),
      },
      payment_method_types: ['card'],
    });
  }

  async createCheckoutSession(
    amount: number,
    currency: string,
    productName: string,
    customerEmail: string
  ): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      mode: 'payment',
      success_url: env.PAYMENT_SUCCESS_URL,
      cancel_url: env.PAYMENT_CANCEL_URL,
    });
  }

  public constructWebhookEvent(payload: Buffer, sig: string | string[]): Stripe.Event {
    return stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET);
  }
}
