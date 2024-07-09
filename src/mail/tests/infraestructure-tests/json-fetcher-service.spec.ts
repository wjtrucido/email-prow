import { JsonFetcherService } from '../../infrastructure/json-fetcher.service';

describe('JsonFetcherService', () => {
  let jsonFetcherService: JsonFetcherService;

  beforeEach(() => {
    jsonFetcherService = new JsonFetcherService();
  });

  describe('fetchJsonFilesFromLinks', () => {
    it('should fetch json files from links', async () => {
      const links = ['https://jsonplaceholder.typicode.com/posts/1'];
      const jsonFiles = await jsonFetcherService.fetchJsonFilesFromLinks(links);
      expect(jsonFiles).toEqual([
        {
          content: {
            userId: 1,
            id: 1,
            title:
              'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body:
              'quia et suscipit\n' +
              'suscipit recusandae consequuntur expedita et cum\n' +
              'reprehenderit molestiae ut ut quas totam\n' +
              'nostrum rerum est autem sunt rem eveniet architecto',
          },
          filename: 'https://jsonplaceholder.typicode.com/posts/1.json',
        },
      ]);
    });
  });
});
