import moment from 'moment';
import { OtpType } from '../constants/enums';
import { generateOtp } from '../utils/util';
import { OtpRepository } from '../repositories/otp.repository';
import { BadRequestException } from '../exceptions/badRequest.exception';

/**
 * @class OtpService
 * Handles Otp service logic
 */
export class OtpService {
  private static instance: OtpService;
  private otpRepository: OtpRepository;

  private constructor() {
    this.otpRepository = OtpRepository.getInstance();
  }

  public static getInstance(): OtpService {
    if (!OtpService.instance) {
      OtpService.instance = new OtpService();
    }
    return OtpService.instance;
  }

  /**
   * @method createOtp
   * @param {number} userId User Id to create otp code for
   * @param {OtpType} otpType Otp type for otp
   * @returns Created otp information
   * @description Create otp for user for required otp type
   */
  public createOtp = async (userId: number, otpType: OtpType) => {
    const expiredAt = moment().add(2, 'minutes').toDate(); // otp is valid for 2 min
    const code = generateOtp(); // otp code

    return await this.otpRepository.createOtp({
      userId,
      type: otpType,
      expiredAt,
      code,
    });
  };

  /**
   * @method veifyOtp
   * @param {number} userId - Id of user
   * @param {OtpType} otpType - otp type
   * @param {string} code - otp code
   * @returns void
   * @description user signup with email
   */
  public veifyOtp = async (userId: number, otpType: OtpType, code: string): Promise<void> => {
    const otpInfo = await this.otpRepository.getUnusedOtpByEmail(userId, otpType);

    if (!otpInfo) {
      throw new BadRequestException('Invalid otp!');
    }

    const isBefore = moment().isBefore(otpInfo.expiredAt);

    if (!isBefore) {
      throw new BadRequestException('otp is expired!');
    }

    if (otpInfo.code !== code) {
      throw new BadRequestException('Invalid otp!');
    }

    // set otp as used
    await this.otpRepository.setUsedOtpByUserId(userId, otpType, code);
  };
}
