import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotFoundException extends HttpException {
  constructor(filePath: string) {
    super(`File not found: ${filePath}`, HttpStatus.NOT_FOUND);
  }
}
