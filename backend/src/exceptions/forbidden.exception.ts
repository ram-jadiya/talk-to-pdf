import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

// Thrown when a user is authenticated but doesn't have permission to access a resource.
export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(statusCode.FORBIDDEN, message);
  }
}
