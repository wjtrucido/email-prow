import { EmailEntity, Attachment } from './email.entity';

export class EmailFactory {
  static createFromData(
    attachments: Attachment[],
    htmlBody: string,
  ): EmailEntity {
    return new EmailEntity(attachments, htmlBody);
  }
}
