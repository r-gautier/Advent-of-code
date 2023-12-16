import { Injectable } from '@nestjs/common';
import { Challenge } from '../common/interfaces/challenge.interface';

export type Game = {
  id: number;
  plays: Array<BagPick>;
};

export type BagPick = Record<CubeColor, number>;

export enum CubeColor {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
}

const CUBE_LIMITS: Record<CubeColor, number> = {
  [CubeColor.Red]: 12,
  [CubeColor.Green]: 13,
  [CubeColor.Blue]: 14,
};

@Injectable()
export class CubeConundrumChallenge implements Challenge<Game[], number> {
  public solve(games: Game[]): number {
    return games.reduce((result, game) => {
      const gameContribution = this.isValidGame(game) ? 0 : game.id;
      return result + gameContribution;
    }, 0);
  }

  private isValidGame(game: Game): boolean {
    return game.plays.every((play) => this.isValidPlay(play));
  }

  private isValidPlay(play: BagPick): boolean {
    return Object.values(CubeColor).every(
      (color) => play[color] <= CUBE_LIMITS[color],
    );
  }

  public solveAdvanced(games: Game[]): number {
    throw new Error('Method not implemented.');
  }
}
