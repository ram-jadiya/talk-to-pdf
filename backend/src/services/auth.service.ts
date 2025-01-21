import { Response } from 'express';
import { env } from '../configs/env.config';
import { OtpType } from '../constants/enums';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { ConflictException } from '../exceptions/conflict.exception';
import { NotFoundException } from '../exceptions/notFound.exception';
import { OtpRepository } from '../repositories/otp.repository';
import { UserRepository } from '../repositories/user.repository';
import { signUpBody } from '../types/auth';
import { User } from '../types/user';
import sendEmail from '../utils/sendMail.util';
import { OtpService } from './otp.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN, REFERESH_TOKEN } from '../constants/common.constant';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { signupBody } from '../utils/mailBody/signupOtpBody';
import { logInBody } from '../utils/mailBody/logInOtpBody';

/**
 * services/google-auth.service.ts
 * Handles Google authentication logic
 */
export class AuthService {
  private static instance: AuthService;
  private userRepository: UserRepository;
  private otpService: OtpService;
  private otpRepository: OtpRepository;

  private constructor() {
    this.userRepository = UserRepository.getInstance();
    this.otpService = OtpService.getInstance();
    this.otpRepository = OtpRepository.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * @method userSignUp
   * @param {signUpBody} userData - User signup data
   * @returns {User} user info
   * @description user signup with email
   */
  public userSignUp = async (userData: signUpBody): Promise<User> => {
    // Check if user exists
    let user = await this.userRepository.findUserByEmail(userData.email);

    if (user && user.isVerified) {
      throw new ConflictException('Email already taken!');
    }

    if (user && !user.isVerified) {
      // unverified user exists then del it
      await this.userRepository.deleteUserByEmail(userData.email);
    }
    if (!user || !user.isVerified) {
      user = await this.userRepository.createUser({
        email: userData.email,
        fName: userData.fName,
        lName: userData.lName,
        googleId: undefined,
        avatar: undefined,
        isVerified: false,
      });
    }

    // generate Otp
    const otpInfo = await this.otpService.createOtp(user.id, OtpType.SIGN_UP);

    // send mail to user email
    await sendEmail({
      from: { name: 'TalkToPdf', address: env.SMTP_USER },
      to: userData.email,
      html: signupBody(otpInfo.code),
      subject: 'Singup Otp',
    });

    return user;
  };

  /**
   * @method sendSignUpOtp
   * @param {string} email - User email
   * @returns {User} user info
   * @description user signup otp request
   */
  public sendSignUpOtp = async (email: string): Promise<User> => {
    // Check if user exists
    let user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Email is not exist!');
    }
    if (user.isVerified) {
      throw new BadRequestException('Email is already been verified!');
    }

    // delete previously generated otps
    await this.otpRepository.delOtpByUserId(user.id);

    // generate Otp
    const otpInfo = await this.otpService.createOtp(user.id, OtpType.SIGN_UP);

    // send mail to user email
    await sendEmail({
      from: { name: 'QueryPdf', address: env.SMTP_USER },
      to: email,
      html: signupBody(otpInfo.code),
      subject: 'Singup Otp',
    });

    return user;
  };

  /**
   * @method verifySignUpOtp
   * @param {string} email - User email
   * @param {string} code - signup otp code
   * @returns {User} user info
   * @description varifying signup otp
   */
  public verifySignUpOtp = async (email: string, code: string): Promise<User> => {
    // Check if user exists
    let user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Email is not exist!');
    }
    if (user.isVerified) {
      throw new BadRequestException('Email is already been verified!');
    }

    // verify otp code
    await this.otpService.veifyOtp(user.id, OtpType.SIGN_UP, code);

    // otp is verifed, set user as verified
    user = await this.userRepository.updateVerifyStatus(user.id);

    return user;
  };

  /**
   * @method userSignIn
   * @param {string} email User email to search
   * @returns {User} user info
   * @description user signup with email
   */
  public userSignIn = async (email: string): Promise<User> => {
    // Check if user exists
    let user = await this.userRepository.findUserByEmail(email);

    if (!user || !user.isVerified) {
      throw new NotFoundException('Email not found!');
    }

    // delete previously generated otps
    await this.otpRepository.delOtpByUserId(user.id);

    // generate Otp
    const otpInfo = await this.otpService.createOtp(user.id, OtpType.LOGI_IN);

    // send mail to user email
    await sendEmail({
      from: { name: 'TalkToPdf', address: env.SMTP_USER },
      to: email,
      html: logInBody(otpInfo.code),
      subject: 'LogIn Otp',
    });

    return user;
  };

  /**
   * @method verifySignUpOtp
   * @param {string} email - User email
   * @param {string} code - signup otp code
   * @returns {User} user info
   * @description varifying signup otp
   */
  public verifyLoginOtp = async (email: string, code: string): Promise<User> => {
    // Check if user exists
    let user = await this.userRepository.findUserByEmail(email);

    if (!user || !user.isVerified) {
      throw new BadRequestException('Email is not exist!');
    }

    // verify otp code
    await this.otpService.veifyOtp(user.id, OtpType.LOGI_IN, code);

    return user;
  };

  /**
   * @method generateTokens
   * @param {number} userId - User email
   * @returns access_token and referesh_token
   * @description Generate tokens
   */
  public generateTokens = (userId: number) => {
    const accessToken = jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRATION,
    });

    const refreshToken = jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRATION,
    });

    return { accessToken, refreshToken };
  };

  /**
   * @method setCookies
   * @param {string} accessToken
   * @param {string} refreshToken
   * @returns {void} void
   * @description Set accesstoken and referesh token to cooki
   */
  public setCookies = (accessToken: string, refreshToken: string, res: Response): void => {
    // Set cookies with httpOnly flag for security
    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie(REFERESH_TOKEN, refreshToken, {
      // Here you would typically generate a JWT token
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  };

  /**
   * @method verifyRefereshToken
   * @param {JwtPayload} refereshToken
   * @returns {Object} decoded jwt token data
   * @description verify referesh token
   */
  public verifyRefereshToken = (refereshToken: string): JwtPayload => {
    try {
      return jwt.verify(refereshToken, env.REFRESH_TOKEN_SECRET) as JwtPayload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  };

  /**
   * @method verifyAccessToken
   * @param {JwtPayload} accessToken
   * @returns {object} decoded jwt token data
   * @description verify access token
   */
  public verifyAccessToken = (accessToken: string): JwtPayload => {
    try {
      return jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  };

  public getUserFromAccessToken = async (accessToken: string): Promise<User> => {
    const decodedToken = this.verifyAccessToken(accessToken);
    const userId = decodedToken.userId;
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  };
}
