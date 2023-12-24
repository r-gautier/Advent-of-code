import { Injectable } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';
import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { DeprecatedChallenge } from './common/interfaces/challenge.interface';
import { Parser } from 'src/common/parsers/parser.interface';
import { CubeConundrumChallenge } from './02-Cube_Conundrum/cubeConundrum.challenge';
import { CubeConundrumParser } from './02-Cube_Conundrum/cubeConundrum.parser';
import { Challenge } from './common/services/challenge.abstract';
import { GearRatiosChallenge } from './03-Gear_Ratios/gearRatios.challenge';

export type ChallengeDependency<T> = {
  challenge: DeprecatedChallenge<T, unknown>;
  parser: Parser<T>;
};

@Injectable()
export class ChallengesFacade {
  constructor(
    private readonly singleColumnParser: SingleColumnParser,
    private readonly trebuchetService: TrebuchetChallenge,
    private readonly cubeConundrumService: CubeConundrumChallenge,
    private readonly cubeConundrumParser: CubeConundrumParser,
    private readonly gearRatiosChallenge: GearRatiosChallenge,
  ) {}

  public solve(
    { number, isAdvanced }: { number: number; isAdvanced: boolean },
    content: string,
  ): unknown {
    if (number <= 2) {
      return this.handleDeprecatedChallenge({ number, isAdvanced }, content);
    }

    const challenge = this.buildChallenge(number);
    return isAdvanced
      ? challenge.solveAdvanced(content)
      : challenge.solve(content);
  }

  private buildChallenge(number: number): Challenge<unknown, number> {
    switch (number) {
      case 3:
        return this.gearRatiosChallenge;
      default:
        throw new Error('Challenge not implemented');
    }
  }

  /** @deprecated */
  private handleDeprecatedChallenge(
    { number, isAdvanced }: { number: number; isAdvanced: boolean },
    content: string,
  ) {
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
