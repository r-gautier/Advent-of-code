import { Injectable } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';
import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { Challenge } from './common/interfaces/challenge.interface';
import { Parser } from 'src/common/parsers/parser.interface';

export type ChallengeDependency<T> = {
  challenge: Challenge<T, unknown>;
  parser: Parser<T>;
};

@Injectable()
export class ChallengesFacade {
  constructor(
    private readonly trebuchetService: TrebuchetChallenge,
    private readonly singleColumnParser: SingleColumnParser,
  ) {}

  public solve(
    { number, isAdvanced }: { number: number; isAdvanced: boolean },
    content: string,
  ): unknown {
    const { challenge, parser } = this.buildChallengeDependency(number);

    const parsedContent = parser.parse(content);
    return isAdvanced
      ? challenge.solveAdvanced(parsedContent)
      : challenge.solve(parsedContent);
  }

  private buildChallengeDependency(
    number: number,
  ): ChallengeDependency<unknown> {
    switch (number) {
      case 1:
        return {
          challenge: this.trebuchetService,
          parser: this.singleColumnParser,
        };
      default:
        throw new Error('Challenge not implemented');
    }
  }
}
