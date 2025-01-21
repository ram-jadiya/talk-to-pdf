import { PaymentStatus } from '../constants/enums';

export type Payment = {
  id: number;
  stripePaymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  userId: number;
  expiredDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
