import { OtpType } from '../constants/enums';

export type Otp = {
  id: number;
  userId: number;
  code: string;
  type: OtpType;
  expiredAt: Date;
  isUsed: boolean;
};

export type CreateOtpPayload = Omit<Otp, 'id' | 'isUsed'>;
