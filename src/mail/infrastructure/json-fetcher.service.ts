import { fecthJsonFilesFromEmail } from '../helpers/fecth-json-files-from-email.helper';
import { fetchJsonFilesFromWeb } from '../helpers/fetch-json-files-from-web.helper';
import { Injectable } from '@nestjs/common';
import { JsonFileVO } from '../domain/json-file.vo';
import { LinkNotFoundException } from '../../common/exceptions/link-not-found.exception';
import { NotInternetConnectionException } from '../../common/exceptions/not-internet-connection.exception';
import axios from 'axios';

@Injectable()
export class JsonFetcherService {
  async fetchJsonFilesFromLinks(links: string[]): Promise<JsonFileVO[]> {
    const jsonFiles: JsonFileVO[] = [];
    const fetchPromises = links.map(async (link) => {
      try {
        const response = await axios.get(link, { responseType: 'json' });
        await fecthJsonFilesFromEmail(response, link, jsonFiles);
        await fetchJsonFilesFromWeb(response, jsonFiles);
      } catch (error) {
        console.error(`Error fetching JSON from link ${link}:`, error.message);
        if (error.response && error.response.status === 404) {
          throw new LinkNotFoundException(link);
        }
        if (error.code === 'ENOTFOUND') {
          throw new NotInternetConnectionException();
        }
      }
    });
    await Promise.all(fetchPromises);
    return jsonFiles;
  }
}
