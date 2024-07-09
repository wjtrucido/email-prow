import { FileNotFoundException } from '../../../common/exceptions/file-not-found.exception';

describe('FileNotFoundException', () => {
  it('should create an instance with the correct message and name', () => {
    const filePath = '/path/to/file';
    const exception = new FileNotFoundException(filePath);

    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(FileNotFoundException);
    expect(exception.name).toBe('FileNotFoundException');
    expect(exception.message).toBe(`File not found: ${filePath}`);
    expect(exception.getStatus()).toBe(404);
  });
});
