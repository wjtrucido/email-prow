import { EmailService } from '../src/mail/application/mail.service';
import { JsonFetcherService } from '../src/mail/infrastructure/json-fetcher.service';
import { JsonParserService } from '../src/mail/application/json-parser.service';
import { MailController } from '../src/mail/infrastructure/mail.controller';
import { MailModule } from '../src/mail/mail.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('MailController', () => {
  let controller: MailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [EmailService, JsonParserService, JsonFetcherService],
      imports: [MailModule],
    }).compile();

    controller = module.get<MailController>(MailController);
  });

  it('should process email and return a zip file', async () => {
    const filePath = './eml/testmail3.eml';
    const response = {
      set: jest.fn(),
      send: jest.fn(),
    };

    await controller.processEmail(filePath, response as any);

    expect(response.set).toHaveBeenCalledWith({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="json_files.zip"',
    });

    expect(response.send).toHaveBeenCalled();
    expect(response.send).toHaveBeenCalledWith(expect.any(Buffer));
  });
});
