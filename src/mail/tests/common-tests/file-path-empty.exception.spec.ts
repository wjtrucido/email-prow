import { FilePathEmptyException } from '../../../common/exceptions/file-path-empty.exception';

describe('FilePathEmptyException', () => {
  it('should create an instance with the correct message and name', () => {
    const exception = new FilePathEmptyException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(FilePathEmptyException);
    expect(exception.name).toBe('FilePathEmptyException');
    expect(exception.message).toBe('File path is empty');
    expect(exception.getStatus()).toBe(400);
  });
});
