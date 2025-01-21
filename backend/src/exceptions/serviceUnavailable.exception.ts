import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

export class ServiceUnavailableException extends HttpException {
  constructor(message = 'Service Unavailable') {
    super(statusCode.SERVICE_UNAVAILABLE, message);
  }
}
