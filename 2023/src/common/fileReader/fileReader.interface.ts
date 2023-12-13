export interface FileReader {
  read(path: string): Promise<string>;
}

export const FILE_READER_TOKEN = Symbol('FILE_READER_TOKEN');
