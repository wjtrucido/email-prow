import * as fs from 'fs';
import { simpleParser } from 'mailparser';
import { Attachment } from '../domain/email.entity';

export async function parseEmail(filePath: string) {
  const emailContent = fs.readFileSync(filePath);
  const parsed = await simpleParser(emailContent);

  const attachments: Attachment[] = parsed.attachments.map((att) => ({
    contentType: att.contentType,
    content: att.content as Buffer,
  }));

  return {
    attachments,
    textBody: parsed.text || '',
    htmlBody: parsed.html || '',
  };
}
