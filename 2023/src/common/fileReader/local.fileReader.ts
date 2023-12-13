import { readFileSync } from 'fs';
import { join } from 'path';
import { FileReader } from './fileReader.interface';

export class LocalFileReader implements FileReader {
  async read(path: string): Promise<string> {
    return readFileSync(join(__dirname, '../../../assets', path), 'utf8');
  }
}
