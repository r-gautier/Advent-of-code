import { Parser } from 'src/common/parsers/parser.interface';

export abstract class Challenge<Input, Result> {
  constructor(private readonly parser: Parser<Input>) {}

  public solve(content: string): Result {
    const parsedContent = this.parser.parse(content);
    return this.computeBasicSolution(parsedContent);
  }

  protected abstract computeBasicSolution(parsedContent: Input): Result;

  public solveAdvanced(content: string): Result {
    const parsedContent = this.parser.parse(content);
    return this.computeAdvancedSolution(parsedContent);
  }

  protected abstract computeAdvancedSolution(parsedContent: Input): Result;
}
