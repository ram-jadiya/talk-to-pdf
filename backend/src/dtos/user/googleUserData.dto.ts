import { TokenPayload } from 'google-auth-library';
import { GoogleUserData } from '../../types/user';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

export class GoogleUserDataDto {
  private constructor() {}

  public static toGoogleUserData(googlePayload: TokenPayload | undefined): GoogleUserData {
    if (!googlePayload || !googlePayload.email || !googlePayload.name) {
      throw new UnauthorizedException('Invalid Google token');
    }

    return {
      email: googlePayload.email,
      google_id: googlePayload.sub,
      name: googlePayload.name,
      picture: googlePayload.picture,
    };
  }
}
