import { Injectable } from '@nestjs/common';
import { Challenge } from '../common/services/challenge.abstract';
import { ScratchCard } from './scratchCard';

@Injectable()
export class ScratchCardsChallenge extends Challenge<ScratchCard[], number> {
  protected computeBasicSolution(parsedContent: ScratchCard[]): number {
    throw new Error('Method not implemented.');
  }
  protected computeAdvancedSolution(parsedContent: ScratchCard[]): number {
    throw new Error('Method not implemented.');
  }
}
