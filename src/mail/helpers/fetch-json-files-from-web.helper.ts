import axios, { AxiosResponse } from 'axios';
import { JsonFileVO } from '../domain/json-file.vo';
import * as cheerio from 'cheerio';
import { normalizeLink } from './normalize-link.helper';

export const fetchJsonFilesFromWeb = async (
  response: AxiosResponse,
  jsonFiles: JsonFileVO[],
) => {
  if (response.headers['content-type'].includes('text/html')) {
    const $ = cheerio.load(response.data);
    const baseUrl = response.config.url;

    const links = $('a[href]')
      .map((_, element) => $(element).attr('href'))
      .get()
      .map((link) => normalizeLink(link, baseUrl));

    const fetchPromises = links.map(async (link) => {
      try {
        const jsonResponse = await axios.get(link, {
          responseType: 'json',
        });
        if (jsonResponse.headers['content-type'].includes('application/json')) {
          jsonFiles.push(
            new JsonFileVO(jsonResponse.data, `external_on_website.json`),
          );
        }
      } catch (error) {
        console.error(`Error fetching JSON from link ${link}:`, error.message);
      }
    });
    await Promise.all(fetchPromises);
  }
};
