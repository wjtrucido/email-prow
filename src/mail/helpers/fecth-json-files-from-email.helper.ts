import { AxiosResponse } from 'axios';
import { JsonFileVO } from '../domain/json-file.vo';

export const fecthJsonFilesFromEmail = async (
  response: AxiosResponse,
  link: string,
  jsonFiles: JsonFileVO[],
) => {
  if (response.headers['content-type'].includes('application/json')) {
    jsonFiles.push(new JsonFileVO(response.data, `${link}.json`));
  }
};
