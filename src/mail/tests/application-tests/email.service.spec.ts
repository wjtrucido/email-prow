import { EmailService } from '../../application/mail.service';
import { FilePathEmptyException } from '../../../common/exceptions/file-path-empty.exception';
import { InvalidFileExtensionException } from '../../../common/exceptions/invalid-file-extension.exception';
import { JsonFetcherService } from '../../infrastructure/json-fetcher.service';
import { JsonParserService } from '../../application/json-parser.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, JsonParserService, JsonFetcherService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should process email and return a zip buffer', async () => {
    const relativeFilePath = '../../../../eml/testmail.eml';
    const absoluteFilePath = path.resolve(__dirname, relativeFilePath);

    const result = await service.processEmail(absoluteFilePath);

    expect(result).toBeInstanceOf(Buffer);
  }, 15000);

  it('should throw InvalidFileExtensionException when file extension is not .eml', async () => {
    const invalidFilePath = 'test.txt';
    await expect(service.processEmail(invalidFilePath)).rejects.toThrow(
      InvalidFileExtensionException,
    );
  });

  it('should throw FilePathEmptyException when file path is empty', async () => {
    const emptyFilePath = '';
    await expect(service.processEmail(emptyFilePath)).rejects.toThrow(
      FilePathEmptyException,
    );
  });
});
