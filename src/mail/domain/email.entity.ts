export interface Attachment {
  contentType: string;
  content: Buffer;
}

export class EmailEntity {
  constructor(
    private readonly attachments: Attachment[],
    private readonly htmlBody: string,
  ) { }

  getAttachments(): Attachment[] {
    return this.attachments;
  }

  getHtmlBody(): string {
    return this.htmlBody;
  }
}
