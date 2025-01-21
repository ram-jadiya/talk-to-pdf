import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

// This exception is thrown when the client sends an invalid or malformed request.
export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(statusCode.BAD_REQUEST, message);
  }
}
