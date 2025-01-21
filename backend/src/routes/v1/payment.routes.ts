import { Router } from 'express';
import express from 'express';
import { Route } from '../../types';
import { PaymentController } from '../../controllers/payment.controller';
import { validate } from '../../middlewares/validation.middleware';
import { planIdSchema } from '../../validations/payment.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

class PaymentRoutes implements Route {
  public router = Router();
  public path = '/payment';
  private paymentController: PaymentController;

  constructor() {
    this.paymentController = PaymentController.getInstance();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/plan', this.paymentController.getPlans);

    this.router.get(
      '/create-checkout-session',
      validate({
        query: planIdSchema,
      }),
      authMiddleware,
      this.paymentController.createStripeCheckoutSession
    );

    this.router.get(
      '/create-payment-intent',
      validate({
        query: planIdSchema,
      }),
      authMiddleware,
      this.paymentController.createPaymentIntent
    );

    this.router.post(
      '/webhook',
      express.raw({ type: 'application/json' }),
      this.paymentController.webhook
    );
  }
}

export default PaymentRoutes;
