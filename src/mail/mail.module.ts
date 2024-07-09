import { Module } from '@nestjs/common';
import { EmailService } from './application/mail.service';
import { JsonParserService } from './application/json-parser.service';
import { MailController } from './infrastructure/mail.controller';
import { JsonFetcherService } from './infrastructure/json-fetcher.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [EmailService, JsonParserService, JsonFetcherService],
})
export class MailModule {}
