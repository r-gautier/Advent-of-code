import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { Challenge } from '../common/services/challenge.abstract';
import { Injectable } from '@nestjs/common';
import { isStringANumber } from 'src/common/utils/isStringANumber';

@Injectable()
export class GearRatiosChallenge extends Challenge<string[], number> {
  constructor(parser: SingleColumnParser) {
    super(parser);
  }

  protected computeBasicSolution(parsedContent: string[]): number {
    if (parsedContent.length === 0) {
      return 0;
    }

    const line = parsedContent[0];

    let result = 0;
    line.split('').forEach((char, index) => {
      if (!isStringANumber(char)) {
        return;
      }

      if (
        !this.isCharASymbol(line[index - 1]) &&
        !this.isCharASymbol(line[index + 1])
      ) {
        return;
      }

      result += parseInt(char);
    });

    return result;
  }

  private isCharASymbol(char: string): boolean {
    return char !== undefined && char !== '.' && !isStringANumber(char);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected computeAdvancedSolution(parsedContent: string[]): number {
    throw new Error('Method not implemented.');
  }
}
