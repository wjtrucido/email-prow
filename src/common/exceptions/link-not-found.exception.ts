import { HttpException, HttpStatus } from '@nestjs/common';

export class LinkNotFoundException extends HttpException {
  constructor(link: string) {
    super(`Page or link not found: ${link}`, HttpStatus.NOT_FOUND);
  }
}
