import { Router } from 'express';
import { Route } from '../../types';
import { AuthController } from '../../controllers/auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  signUpSchema,
  signUpVerifySchema,
} from '../../validations/authValidations/signup.validation';
import { emailSchema, logInVerifySchema } from '../../validations/authValidations/signIn.validaion';

class AuthRoutes implements Route {
  public router = Router();
  public path = '/auth';
  private authController: AuthController;

  constructor() {
    this.authController = AuthController.getInstance();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/google`, this.authController.googleLogin);

    this.router.post('/signUp', validate({ body: signUpSchema }), this.authController.signUP);

    this.router.post(
      '/otp/signUp',
      validate({ body: emailSchema }),
      this.authController.reqSignupOtp
    );

    this.router.post(
      '/signUp/verify-otp',
      validate({ body: signUpVerifySchema }),
      this.authController.verifySignupOtp
    );

    this.router.post('/otp/logIn', validate({ body: emailSchema }), this.authController.logIn);

    this.router.post(
      '/logIn/verify-otp',
      validate({ body: logInVerifySchema }),
      this.authController.verifyLoginOtp
    );

    this.router.post('/refresh-token', this.authController.refreshToken);
    this.router.get('/access-token/verify', this.authController.verifyAccessToken);
    this.router.post('/logout', this.authController.logOut);
  }
}

export default AuthRoutes;
