import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

// This exception is used when a user tries to access a protected resource without proper authentication.
export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(statusCode.UNAUTHORIZED, message);
  }
}
