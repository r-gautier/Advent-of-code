import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { Challenge } from '../common/services/challenge.abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GearRatiosChallenge extends Challenge<string[], number> {
  constructor(parser: SingleColumnParser) {
    super(parser);
  }

  protected computeBasicSolution(parsedContent: string[]): number {
    throw new Error('Method not implemented.');
  }

  protected computeAdvancedSolution(parsedContent: string[]): number {
    throw new Error('Method not implemented.');
  }
}
