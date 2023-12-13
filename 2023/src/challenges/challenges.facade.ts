import { Injectable } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';
import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';

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
    switch (number) {
      case 1:
        const parsedContent = this.singleColumnParser.parse(content);
        return isAdvanced
          ? this.trebuchetService.solveAdvanced(parsedContent)
          : this.trebuchetService.solve(parsedContent);
      default:
        throw new Error('Challenge not implemented');
    }
  }
}
