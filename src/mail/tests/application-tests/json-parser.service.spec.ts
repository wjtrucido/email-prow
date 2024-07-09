import { Test, TestingModule } from '@nestjs/testing';
import { JsonParserService } from '../../application/json-parser.service';

describe('JsonParserService', () => {
  let service: JsonParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonParserService],
    }).compile();

    service = module.get<JsonParserService>(JsonParserService);
  });

  it('should extract JSON links from text and HTML', () => {
    const emailMock = {
      getTextBody: () => 'http://example.com/data.json',
      getHtmlBody: () => '<a href="http://example.com/data.json">link</a>',
    };

    const result = service.extractJsonLinks(emailMock as any);
    expect(result).toContain('http://example.com/data.json');
  });
});
