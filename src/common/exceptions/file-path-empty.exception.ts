import { HttpException, HttpStatus } from '@nestjs/common';

export class FilePathEmptyException extends HttpException {
  constructor() {
    super('File path is empty', HttpStatus.BAD_REQUEST);
  }
}
