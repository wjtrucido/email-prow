import { LinkNotFoundException } from '../../../common/exceptions/link-not-found.exception';

describe('LinkNotFoundException', () => {
  it('should return the correct message and status code', () => {
    const link = 'https://example.com/missing';
    const exception = new LinkNotFoundException(link);

    expect(exception.message).toBe(`Page or link not found: ${link}`);
    expect(exception.getStatus()).toBe(404);
  });
});
