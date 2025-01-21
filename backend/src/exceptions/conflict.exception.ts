import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(statusCode.CONFLICT, message);
  }
}
