import { Parser } from './parser.interface';

export class SingleColumnParser implements Parser {
  parse(content: string): string[] {
    return content.split('\n');
  }
}
