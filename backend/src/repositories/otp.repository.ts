import { CreateOtpPayload, Otp } from '../types/otp';
import { dbPool } from '../configs/pgDB.config';
import { OtpType } from '../constants/enums';

export class OtpRepository {
  private static instance: OtpRepository;

  private constructor() {}

  public static getInstance(): OtpRepository {
    if (!OtpRepository.instance) {
      OtpRepository.instance = new OtpRepository();
    }
    return OtpRepository.instance;
  }

  /**
   * @method createOtp
   * @param userData - The user data to create
   * @returns Otp of user
   * @description Insert Otp Info to DB
   */
  public createOtp = async (otpPayload: CreateOtpPayload): Promise<Otp> => {
    const { code, expiredAt, type, userId } = otpPayload;

    const query = `
    INSERT INTO otps ("userId", "code", "type", "expiredAt")
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    const values = [userId, code, type, expiredAt];

    const result = await dbPool.query(query, values);

    return result.rows[0];
  };

  /**
   * @method delOtpByUserId
   * @param userData - The user data to create
   * @returns The list of Otps
   * @description Delete otp by userId from DB
   */
  public delOtpByUserId = async (userId: number): Promise<Otp[]> => {
    const query = `
    DELETE FROM otps WHERE "userId" = $1
    RETURNING *
    `;

    const values = [userId];

    const result = await dbPool.query(query, values);

    return result.rows;
  };

  /**
   * @method getUnusedOtpByEmail
   * @param userId - Id of user
   * @param otpType - Type of otp
   * @returns OTP of user
   * @description retrive un-used otp by email and otp type
   */
  public getUnusedOtpByEmail = async (
    userId: number,
    otpType: OtpType
  ): Promise<Otp | undefined> => {
    const query = `
    SELECT * FROM otps
    WHERE "userId" = $1 AND type = $2 AND "isUsed" = $3
    `;

    const values = [userId, otpType, false];

    const result = await dbPool.query(query, values);

    return result.rows[0];
  };

  /**
   * @method getUnusedOtpByEmail
   * @param userId - Id of user
   * @param otpType - Type of otp
   * @returns OTP of user
   * @description retrive un-used otp by email and otp type
   */
  public setUsedOtpByUserId = async (
    userId: number,
    otpType: OtpType,
    code: string
  ): Promise<Otp | undefined> => {
    const query = `
    UPDATE otps
    SET "isUsed" = true WHERE "userId" = $1 AND type = $2 AND "code" = $3
    `;

    const values = [userId, otpType, code];

    const result = await dbPool.query(query, values);

    return result.rows[0];
  };
}
