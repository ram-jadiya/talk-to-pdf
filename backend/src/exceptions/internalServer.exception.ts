import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

export class InternalServerErrorException extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(statusCode.INTERNAL_SERVER_ERROR, message);
  }
}
