import * as archiver from 'archiver';
import { JsonFileVO } from '../domain/json-file.vo';

export async function createZipFromJsonFiles(
  jsonFiles: JsonFileVO[],
): Promise<Buffer> {
  const archive = archiver('zip');
  const buffers: Buffer[] = [];

  archive.on('data', (data) => buffers.push(data));

  for (const jsonFile of jsonFiles) {
    archive.append(JSON.stringify(jsonFile.content), {
      name: jsonFile.filename,
    });
  }

  archive.finalize();

  return new Promise<Buffer>((resolve, reject) => {
    archive.on('end', () => resolve(Buffer.concat(buffers)));
    archive.on('error', (err) => reject(err));
  });
}
