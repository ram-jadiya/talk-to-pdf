import { NextFunction, Request, Response } from 'express';
import { responseHandler } from '../utils/response.util';
import { plans } from '../constants/plans.constant';
import { RequestWithUser } from '../types/user';
import { PaymentService } from '../services/payment.service';

/**
 * @class PaymentController
 * @description Handles HTTP requests and responses
 */
export class PaymentController {
  private static instance: PaymentController;
  private paymentService: PaymentService;

  private constructor() {
    this.paymentService = PaymentService.getInstance();
  }

  /**
   * @method getInstance
   * @descriptionHandle Get PaymentController instance
   */
  public static getInstance(): PaymentController {
    if (!PaymentController.instance) {
      PaymentController.instance = new PaymentController();
    }
    return PaymentController.instance;
  }

  /**
   * @method createPaymentIntent
   * @param {Request} _req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Create stripe payment intent
   */
  public getPlans = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(responseHandler(plans));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method createPaymentIntent
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Create stripe payment intent
   */
  public createPaymentIntent = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const planId = req.query.planId as unknown as number;
      const userId = req.user!.id;

      const paymentIntentInfo = await this.paymentService.createPayment(userId, planId);

      res.status(200).json(
        responseHandler({
          clientSecret: paymentIntentInfo.client_secret,
          paymentId: paymentIntentInfo.id,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  public createStripeCheckoutSession = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const planId = req.query.planId as unknown as number;
      const user = req.user!;

      const sessionUrl = await this.paymentService.createCheckoutSession(user, planId);

      res.status(200).json(
        responseHandler({
          sessionUrl,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  public webhook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const sig = req.headers['stripe-signature'] ?? '';

      await this.paymentService.handleStripeWebhookEvent(req.body, sig);

      res.json({ received: true });
    } catch (error) {
      next(error);
    }
  };
}
