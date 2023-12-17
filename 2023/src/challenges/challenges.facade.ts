import { Injectable } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';
import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { Challenge } from './common/interfaces/challenge.interface';
import { Parser } from 'src/common/parsers/parser.interface';
import { CubeConundrumChallenge } from './02-Cube_Conundrum/cubeConundrum.challenge';
import { CubeConundrumParser } from './02-Cube_Conundrum/cubeConundrum.parser';

export type ChallengeDependency<T> = {
  challenge: Challenge<T, unknown>;
  parser: Parser<T>;
};

@Injectable()
export class ChallengesFacade {
  constructor(
    private readonly trebuchetService: TrebuchetChallenge,
    private readonly cubeConundrumService: CubeConundrumChallenge,
    private readonly cubeConundrumParser: CubeConundrumParser,
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
      case 2:
        return {
          challenge: this.cubeConundrumService,
          parser: this.cubeConundrumParser,
        };
      default:
        throw new Error('Challenge not implemented');
    }
  }
}
