import { statusCode } from '../constants/statuscode.constant';
import { HttpException } from './http.exception';

export class UnprocessableEntityException extends HttpException {
  constructor(message = 'Unprocessable Entity') {
    super(statusCode.UNPROCESSABLE_ENTITY, message);
  }
}
