import { normalizeLink } from '../../helpers/normalize-link.helper';

describe('normalizeLink', () => {
  it('should normalize a valid link relative to baseUrl', () => {
    const baseUrl = 'https://example.com';
    const link = '/path/to/resource';

    const normalizedLink = normalizeLink(link, baseUrl);

    expect(normalizedLink).toBe('https://example.com/path/to/resource');
  });

  it('should handle absolute URLs correctly', () => {
    const baseUrl = 'https://example.com';
    const absoluteLink = 'https://anotherdomain.com/resource';

    const normalizedLink = normalizeLink(absoluteLink, baseUrl);

    expect(normalizedLink).toBe(absoluteLink);
  });
});
