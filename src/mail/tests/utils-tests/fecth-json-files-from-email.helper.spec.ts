import { AxiosResponse, AxiosHeaders } from 'axios';
import { fecthJsonFilesFromEmail } from '../../helpers/fecth-json-files-from-email.helper';
import { JsonFileVO } from '../../domain/json-file.vo';

describe('fecthJsonFilesFromEmail', () => {
  it('should add a JsonFileVO to jsonFiles if content-type is application/json', () => {
    // Mock de datos de prueba
    const response: AxiosResponse = {
      data: { key: 'value' },
      headers: { 'content-type': 'application/json; charset=utf-8' },
      status: 200,
      statusText: 'OK',
      config: {
        headers: new AxiosHeaders({ 'content-type': 'application/json' }),
      },
      request: {},
    };

    const link = 'https://jsonplaceholder.typicode.com/users';
    const jsonFiles: JsonFileVO[] = [];

    fecthJsonFilesFromEmail(response, link, jsonFiles);

    expect(jsonFiles.length).toBe(1);
    expect(jsonFiles[0].filename).toBe(`${link}.json`);
    expect(jsonFiles[0].content).toEqual(response.data);
  });

  it('should not add a JsonFileVO if content-type is not application/json', () => {
    // Mock de datos de prueba
    const response: AxiosResponse = {
      data: { key: 'value' },
      headers: { 'content-type': 'text/html' },
      status: 200,
      statusText: 'OK',
      config: {
        headers: new AxiosHeaders({
          'content-type': 'text/html;charset=UTF-8',
        }),
      },
      request: {},
    };

    const link = 'https://petstore.octoperf.com/actions/Catalog.action';
    const jsonFiles: JsonFileVO[] = [];

    fecthJsonFilesFromEmail(response, link, jsonFiles);

    expect(jsonFiles.length).toBe(0);
  });
});
