import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

export class TimeoutException extends HttpException {
  constructor(message = 'Request Timeout') {
    super(statusCode.REQUEST_TIMEOUT, message);
  }
}
