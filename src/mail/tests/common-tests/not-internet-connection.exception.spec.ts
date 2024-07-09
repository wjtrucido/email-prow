import { NotInternetConnectionException } from '../../../common/exceptions/not-internet-connection.exception';

describe('NotInternetConnectionException', () => {
  it('should return the correct message and status code', () => {
    const exception = new NotInternetConnectionException();

    expect(exception.message).toBe('There is no Internet conection');
    expect(exception.getStatus()).toBe(503);
  });
});
