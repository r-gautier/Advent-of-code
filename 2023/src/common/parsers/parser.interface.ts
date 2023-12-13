export interface Parser {
  parse(content: string): unknown;
}

export const PARSER_TOKEN = Symbol('PARSER_TOKEN');
