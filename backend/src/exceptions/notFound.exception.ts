import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(statusCode.NOT_FOUND, message);
  }
}
