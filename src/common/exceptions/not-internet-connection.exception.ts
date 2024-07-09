import { HttpException, HttpStatus } from '@nestjs/common';

export class NotInternetConnectionException extends HttpException {
  constructor() {
    super('There is no Internet conection', HttpStatus.SERVICE_UNAVAILABLE);
  }
}
