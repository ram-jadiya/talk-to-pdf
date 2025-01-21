import { NextFunction, Request, Response } from 'express';
import { GoogleAuthService } from '../services/googleAuth.service';
import { responseHandler } from '../utils/response.util';
import { signUpBody } from '../types/auth';
import { AuthService } from '../services/auth.service';
import { ACCESS_TOKEN, REFERESH_TOKEN } from '../constants/common.constant';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

/**
 * @class AuthController
 * @description Handles HTTP requests and responses
 */
export class AuthController {
  private static instance: AuthController;
  private googleAuthService: GoogleAuthService;
  private authService: AuthService;

  private constructor() {
    this.googleAuthService = GoogleAuthService.getInstance();
    this.authService = AuthService.getInstance();
  }

  /**
   * @method getInstance
   * @descriptionHandle Get AuthController instance
   */
  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  /**
   * @method googleLogin
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Google login request
   */
  public googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;

      const { user } = await this.googleAuthService.processGoogleLogin(token);

      // generate jwt tokens and set to cookies
      const { accessToken, refreshToken } = this.authService.generateTokens(user.id);
      this.authService.setCookies(accessToken, refreshToken, res);

      res.status(200).json(responseHandler({ user, accessToken }));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method signUP
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Google login request
   */
  public signUP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signUpInfo: signUpBody = req.body;

      const user = await this.authService.userSignUp(signUpInfo);

      res.status(200).json(responseHandler(user));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method signUP
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Google login request
   */
  public reqSignupOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const user = await this.authService.sendSignUpOtp(email);

      res.status(200).json(responseHandler(user));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method signUP
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Google login request
   */
  public verifySignupOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code } = req.body;

      const user = await this.authService.verifySignUpOtp(email, code);

      // generate jwt tokens and set to cookies
      const { accessToken, refreshToken } = this.authService.generateTokens(user.id);
      this.authService.setCookies(accessToken, refreshToken, res);

      res.status(200).json(responseHandler(user));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method logIn
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Google login request
   */
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const user = await this.authService.userSignIn(email);

      res.status(200).json(responseHandler(user));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method signUP
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Google login request
   */
  public verifyLoginOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code } = req.body;

      const user = await this.authService.verifyLoginOtp(email, code);

      // generate jwt tokens and set to cookies
      const { accessToken, refreshToken } = this.authService.generateTokens(user.id);
      this.authService.setCookies(accessToken, refreshToken, res);

      res.status(200).json(responseHandler({ user, accessToken }));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method signUP
   * @param {Request} _req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Google login request
   */
  public logOut = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie(ACCESS_TOKEN);
      res.clearCookie(REFERESH_TOKEN);

      res.status(200).json(responseHandler());
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method refreshToken
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Referesh access token through refresh token
   */
  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshJWTToken = req.cookies[REFERESH_TOKEN];

      if (!refreshJWTToken) {
        throw new UnauthorizedException('Refresh token not found!');
      }

      // verifying referesh token
      const decodedObj = this.authService.verifyRefereshToken(refreshJWTToken);

      // generate jwt tokens and set to cookies
      const { accessToken, refreshToken } = this.authService.generateTokens(decodedObj.userId);

      // set cookie to the response
      this.authService.setCookies(accessToken, refreshToken, res);

      res.status(200).json(responseHandler());
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method verifyAccessToken
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle verifying access jwt token
   */
  public verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessJwtToken = req.cookies[ACCESS_TOKEN];

      if (!accessJwtToken) {
        throw new UnauthorizedException('Access token not found!');
      }

      const user =await this.authService.getUserFromAccessToken(accessJwtToken);

      res.status(200).json(responseHandler(user));
    } catch (error) {
      next(error);
    }
  };
}
