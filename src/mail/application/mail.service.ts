import { createZipFromJsonFiles } from '../helpers/zip.helper';
import { EmailFactory } from '../domain/email.factory';
import { Injectable } from '@nestjs/common';
import { JsonFetcherService } from '../infrastructure/json-fetcher.service';
import { JsonFileVO } from '../domain/json-file.vo';
import { JsonParserService } from './json-parser.service';
import { parseEmail } from '../helpers/email-parser.helper';
import { FilePathEmptyException } from '../../common/exceptions/file-path-empty.exception';
import { InvalidFileExtensionException } from '../../common/exceptions/invalid-file-extension.exception';
import { MalformedEmlException } from '../../common/exceptions/malformed-eml.exception';
import { FileNotFoundException } from '../../common/exceptions/file-not-found.exception';
import { isPathValid } from '../helpers/is-path-valid.helper';

@Injectable()
export class EmailService {
  constructor(
    private readonly jsonParserService: JsonParserService,
    private readonly jsonFetcherService: JsonFetcherService,
  ) { }

  async processEmail(filePath: string): Promise<Buffer> {
    if (!filePath) {
      throw new FilePathEmptyException();
    }
    if (!filePath.endsWith('.eml')) {
      throw new InvalidFileExtensionException('should be .eml');
    }
    const isPathValidResult = await isPathValid(filePath);
    if (!isPathValidResult) {
      throw new FileNotFoundException(`File not found ${filePath}`);
    }
    const parsedData = await parseEmail(filePath);
    if (!parsedData) {
      throw new MalformedEmlException();
    }
    const emailEntity = EmailFactory.createFromData(
      parsedData.attachments,
      parsedData.htmlBody,
    );

    const jsonFilesFromAttachments = emailEntity
      .getAttachments()
      .filter((att) => att.contentType === 'application/json')
      .reverse()
      .map((att, index) => {
        return new JsonFileVO(
          JSON.parse(att.content.toString()),
          `attachmentFile_${index + 1}.json`,
        );
      });

    const links = this.jsonParserService.extractJsonLinks(emailEntity);
    const jsonFilesFromLinks =
      await this.jsonFetcherService.fetchJsonFilesFromLinks(links);

    const allJsonFiles = [...jsonFilesFromAttachments, ...jsonFilesFromLinks];

    return createZipFromJsonFiles(allJsonFiles);
  }
}
