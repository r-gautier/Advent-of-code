export interface Parser<Result> {
  parse(content: string): Result;
}

export const PARSER_TOKEN = Symbol('PARSER_TOKEN');
