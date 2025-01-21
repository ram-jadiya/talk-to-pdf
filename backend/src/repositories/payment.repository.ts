import { dbPool } from '../configs/pgDB.config';
import { PaymentStatus } from '../constants/enums';
import { Payment } from '../types/payment';

export class PaymentRepository {
  private static instance: PaymentRepository;

  private constructor() {}

  public static getInstance(): PaymentRepository {
    if (!PaymentRepository.instance) {
      PaymentRepository.instance = new PaymentRepository();
    }
    return PaymentRepository.instance;
  }

  /**
   * @method createPayment
   * @param payment - The payment data
   * @returns Payment information
   * @description Insert payment Info to DB
   */
  async createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    const query = `
      INSERT INTO payments (
        "stripePaymentId",
        amount,
        currency,
        status,
        "userId",
        "expiredDate"
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      payment.stripePaymentId,
      payment.amount,
      payment.currency,
      payment.status,
      payment.userId,
      payment.expiredDate,
    ];

    const result = await dbPool.query(query, values);
    return result.rows[0];
  }

  async updatePaymentStatus(stripePaymentId: string, status: PaymentStatus): Promise<Payment> {
    const query = `
        UPDATE payments
        SET
          status = $1,
          "updatedAt" = NOW()
        WHERE "stripePaymentId" = $2
        RETURNING *
      `;

    const result = await dbPool.query(query, [status, stripePaymentId]);
    return result.rows[0];
  }
}
