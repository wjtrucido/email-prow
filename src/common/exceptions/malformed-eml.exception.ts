import { HttpException, HttpStatus } from '@nestjs/common';

export class MalformedEmlException extends HttpException {
  constructor() {
    super(
      'The .eml file does not contain valid data or is malformed',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
