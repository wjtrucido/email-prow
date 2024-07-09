import { MalformedEmlException } from '../../../common/exceptions/malformed-eml.exception';

describe('MalformedEmlException', () => {
  it('should create an instance with the default message and name', () => {
    const exception = new MalformedEmlException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(MalformedEmlException);
    expect(exception.name).toBe('MalformedEmlException');
    expect(exception.message).toBe(
      'The .eml file does not contain valid data or is malformed',
    );
    expect(exception.getStatus()).toBe(422);
  });
});
