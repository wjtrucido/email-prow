// unit tests email-factory.spec.ts
import { EmailFactory } from '../../domain/email.factory';

const content = 'json content';
const contentToBuffer = Buffer.from(content);

describe('EmailFactory', () => {
  describe('createFromData', () => {
    it('should create email entity from data', () => {
      const attachments = [
        {
          contentType: 'application/json',
          content: contentToBuffer,
        },
      ];
      const htmlBody = 'html body';
      const emailEntity = EmailFactory.createFromData(attachments, htmlBody);
      expect(emailEntity.getAttachments()).toEqual(attachments);
      expect(emailEntity.getHtmlBody()).toEqual(htmlBody);
    });
  });
});
