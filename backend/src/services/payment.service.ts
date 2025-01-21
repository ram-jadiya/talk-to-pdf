import moment from 'moment';
import { PaymentStatus } from '../constants/enums';
import { plans } from '../constants/plans.constant';
import { PaymentRepository } from '../repositories/payment.repository';
import { StripeService } from './stripe.service';
import { UserRepository } from '../repositories/user.repository';
import Stripe from 'stripe';
import { Payment } from '../types/payment';
import { User } from '../types/user';

/**
 * @class PaymentService
 * Handles Stripe payments
 */
export class PaymentService {
  private static instance: PaymentService;
  private stripeServiec: StripeService;
  private paymentRepository: PaymentRepository;
  private userRepository: UserRepository;

  private constructor() {
    this.stripeServiec = StripeService.getInstance();
    this.paymentRepository = PaymentRepository.getInstance();
    this.userRepository = UserRepository.getInstance();
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  /**
   * @method createPayment
   * @param {number} userId - user unique Id
   * @param {number} planId - user selected planId
   * @returns {Stripe.PaymentIntent} It return stripe payment Intent information
   * @descriptionHandle It create the stripe payment itent and handl db action
   */
  public createPayment = async (userId: number, planId: number): Promise<Stripe.PaymentIntent> => {
    const planInfo = plans[planId];
    const currenty = 'USD';
    const price = planInfo.price;
    const expiredDate = moment().add(1, 'M').toDate();

    const paymetIntent = await this.stripeServiec.createPaymentIntent(
      planInfo.price,
      'USD',
      userId
    );

    // database injection
    await this.paymentRepository.createPayment({
      stripePaymentId: paymetIntent.id,
      amount: price,
      currency: currenty,
      userId,
      status: PaymentStatus.PENDING,
      expiredDate: expiredDate,
    });

    return paymetIntent;
  };

  public createCheckoutSession = async (userInfo: User, planId: number) => {
    const userId = userInfo.id;
    const planInfo = plans[planId];
    const currenty = 'USD';
    const price = planInfo.price * 100;
    const expiredDate = moment().add(1, 'M').toDate();

    const session = await this.stripeServiec.createCheckoutSession(
      price,
      'USD',
      planInfo.title + ' Subscription',
      userInfo.email
    );

    // database injection
    await this.paymentRepository.createPayment({
      stripePaymentId: session.id,
      amount: price,
      currency: currenty,
      userId,
      status: PaymentStatus.PENDING,
      expiredDate: expiredDate,
    });

    return session.url;
  };

  /**
   * @method handlePaymentSuccess
   * @param {string} stripePaymentId - stripe unique payment Id
   * @returns {Payment} - It return updated payment information
   * @descriptionHandle It validate payment, update payment and user status for payment
   */
  public handlePaymentSuccess = async (stripePaymentId: string): Promise<Payment> => {
    // Update database
    const paymentInfo = await this.paymentRepository.updatePaymentStatus(
      stripePaymentId,
      PaymentStatus.SUCCEEDED
    );

    // updating isPremium user status
    await this.userRepository.updateIsPremiumByUserId(paymentInfo.userId, true);

    return paymentInfo;
  };

  public async handleStripeWebhookEvent(payload: Buffer, sig: string | string[]): Promise<void> {
    const event = this.stripeServiec.constructWebhookEvent(payload, sig);

    if (event.type === 'checkout.session.completed') {
      const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;
      const sessionId = checkoutSessionCompleted.id;

      await this.handlePaymentSuccess(sessionId);
    }
  }
}
