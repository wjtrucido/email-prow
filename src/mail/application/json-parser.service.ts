import { EmailEntity } from '../domain/email.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonParserService {
  extractJsonLinks(email: EmailEntity): string[] {
    const htmlLinks = this.extractLinksFromHtml(email.getHtmlBody());
    return [...htmlLinks];
  }

  private extractLinksFromHtml(html: string): string[] {
    const regex = /href="(https?:\/\/[^"]+)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }
}
