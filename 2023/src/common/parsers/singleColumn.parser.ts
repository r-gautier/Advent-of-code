import { Parser } from './parser.interface';

export class SingleColumnParser implements Parser<string[]> {
  parse(content: string): string[] {
    const lines = content.split('\n');

    lines.pop(); // remove last empty line

    return lines;
  }
}
