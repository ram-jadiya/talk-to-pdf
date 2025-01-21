import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

export class ServiceUnavailableException extends HttpException {
  constructor(message = 'Payment required!') {
    super(statusCode.PAYMENT_REQUIRED, message);
  }
}
