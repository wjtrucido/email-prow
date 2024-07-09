import { promises as fs } from 'fs';
import * as path from 'path';

export const isPathValid = async (filePath: string): Promise<boolean> => {
  try {
    const resolvedPath = path.resolve(filePath);
    await fs.access(resolvedPath);
    return true;
  } catch (error) {
    return false;
  }
};
