import {
  Controller,
  Query,
  Get,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from '../application/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly emailService: EmailService) { }

  @Get('process-email')
  async processEmail(
    @Query('filePath') filePath: string,
    @Res() res: Response,
  ): Promise<any> {
    console.log('Processing email, el file path es: ', filePath);
    try {
      const zipBuffer = await this.emailService.processEmail(filePath);
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="json_files.zip"',
      });
      res.send(zipBuffer);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.getStatus ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
