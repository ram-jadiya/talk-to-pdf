import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { env } from '../configs/env.config';
import { GoogleUserData, User } from '../types/user';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { GoogleUserDataDto } from '../dtos/user/googleUserData.dto';
import { UserRepository } from '../repositories/user.repository';

/**
 * @class GoogleAuthService
 * @method Handles Google authentication logic
 */
export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private googleClient: OAuth2Client;
  private userRepository: UserRepository;

  private constructor() {
    this.googleClient = new OAuth2Client({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectUri: env.GOOGLE_REDIRECT_URI,
    });
    this.userRepository = UserRepository.getInstance();
  }

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  /**
   * @method processGoogleLogin
   * @param token - The ID token from Google
   * @returns Processed user data and authentication status
   * @description Verify and process googl login
   */
  public processGoogleLogin = async (
    token: string
  ): Promise<{ user: User; isNewUser: boolean }> => {
    // Verify the token
    const userData = await this.verifyGoogleToken(token);

    // Check if user exists
    let user = await this.userRepository.findUserByEmail(userData.email);
    let isNewUser = false;

    if (user && !user.isVerified) {
      // unverified user exists then del it
      await this.userRepository.deleteUserByEmail(userData.email);
    }

    if (!user || !user.isVerified) {
      isNewUser = true;
      user = await this.userRepository.createUser({
        email: userData.email,
        fName: userData.name.split(' ')[0],
        lName: userData.name.split(' ')[1],
        googleId: userData.google_id,
        avatar: userData.picture,
        isVerified: true,
      });
    }

    // Update last login
    user = await this.userRepository.updateLastLogin(user.id);

    return { user, isNewUser };
  };

  /**
   * @method verifyGoogleToken
   * @param token - The ID token to verify
   * @returns Verified token payload
   * @description Verify Google ID token
   */
  private async verifyGoogleToken(token: string): Promise<GoogleUserData> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload: TokenPayload | undefined = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }

      return GoogleUserDataDto.toGoogleUserData(payload);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
