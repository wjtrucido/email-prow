import { AxiosResponse, AxiosHeaders } from 'axios';
import { fetchJsonFilesFromWeb } from '../../helpers/fetch-json-files-from-web.helper';
import { JsonFileVO } from '../../domain/json-file.vo';

describe('fecthJsonFilesFromWeb', () => {
  it('should not carry out the process if content-type is application/json', async () => {
    const responseMock: AxiosResponse = {
      data: { key: 'value' },
      headers: { 'content-type': 'text/html; charset=UTF-8' },
      status: 200,
      statusText: 'OK',
      config: {
        headers: new AxiosHeaders({
          'content-type': 'text/html; charset=UTF-8',
        }),
      },
      request: {},
    };

    const jsonFiles: JsonFileVO[] = [];

    await fetchJsonFilesFromWeb(responseMock, jsonFiles);

    expect(jsonFiles.length).toBe(0);
  });

  it('should process if the content type is text/html; charset=UTF-8', async () => {
    const responseMock: AxiosResponse = {
      data: `
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <a href="https://jsonplaceholder.typicode.com/posts/1">Link</a>
        </body>
      </html>
      `,
      headers: { 'content-type': 'text/html; charset=UTF-8' },
      status: 200,
      statusText: 'OK',
      config: {
        headers: new AxiosHeaders({
          'content-type': 'text/html;charset=UTF-8',
        }),
      },
      request: {},
    };

    const jsonFiles: JsonFileVO[] = [];

    await fetchJsonFilesFromWeb(responseMock, jsonFiles);

    const data = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };

    expect(jsonFiles.length).toBe(1);
    expect(jsonFiles[0].filename).toBe('external_on_website.json');
    expect(jsonFiles[0].content).toEqual(data);
  });
});
