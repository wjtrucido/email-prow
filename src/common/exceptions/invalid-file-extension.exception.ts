import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileExtensionException extends HttpException {
  constructor(fileExtension: string) {
    super(`Invalid file extension: ${fileExtension}`, HttpStatus.BAD_REQUEST);
  }
}
