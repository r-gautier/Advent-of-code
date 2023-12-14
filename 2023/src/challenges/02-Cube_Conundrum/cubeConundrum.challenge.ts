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
    if (games.length === 0) {
      return 0;
    }

    const singleGame = games[0];

    if (singleGame.plays.length === 0) {
      return 0;
    }

    const playsTotal = singleGame.plays.reduce(
      (total, singlePlay) => {
        Object.values(CubeColor).forEach((color) => {
          total[color] += singlePlay[color];
        });
        return total;
      },
      {
        [CubeColor.Red]: 0,
        [CubeColor.Green]: 0,
        [CubeColor.Blue]: 0,
      },
    );

    return Object.values(CubeColor).some(
      (color) => playsTotal[color] > CUBE_LIMITS[color],
    )
      ? 1
      : 0;
  }

  public solveAdvanced(games: Game[]): number {
    throw new Error('Method not implemented.');
  }
}
