//unit tests email-parser.spec.ts
import { parseEmail } from '../../helpers/email-parser.helper';
import * as fs from 'fs';
import { simpleParser } from 'mailparser';

jest.mock('fs');
jest.mock('mailparser');

describe('EmailParser', () => {
  describe('parseEmail', () => {
    it('should parse email', async () => {
      const emailContent = 'email content';
      const parsed = {
        attachments: [
          {
            contentType: 'application/json',
            content: 'json content',
          },
        ],
        text: 'text body',
        html: 'html body',
      };
      (fs.readFileSync as jest.Mock).mockReturnValue(emailContent);
      (simpleParser as jest.Mock).mockResolvedValue(parsed);

      const parsedData = await parseEmail('file.eml');
      expect(parsedData).toEqual({
        attachments: [
          {
            contentType: 'application/json',
            content: 'json content',
          },
        ],
        textBody: 'text body',
        htmlBody: 'html body',
      });
    });
  });
});
