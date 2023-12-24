import { Injectable } from '@nestjs/common';
import { DeprecatedChallenge } from '../common/interfaces/challenge.interface';

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
export class CubeConundrumChallenge
  implements DeprecatedChallenge<Game[], number>
{
  public solve(games: Game[]): number {
    return games.reduce((result, game) => {
      const gameContribution = this.isValidGame(game) ? game.id : 0;
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
    return games.reduce((result, game) => {
      const minimumSets = this.computeMinimumSets(game.plays);

      const contribution = Object.keys(minimumSets).reduce((power, color) => {
        return power * minimumSets[color];
      }, 1);
      return result + contribution;
    }, 0);
  }

  private computeMinimumSets(plays: Array<BagPick>): BagPick {
    return plays.reduce(
      (minimumSets, play) => {
        return Object.values(CubeColor).reduce((colorMinimumSets, color) => {
          return {
            ...colorMinimumSets,
            [color]: Math.max(colorMinimumSets[color], play[color]),
          };
        }, minimumSets);
      },
      { [CubeColor.Red]: 0, [CubeColor.Green]: 0, [CubeColor.Blue]: 0 },
    );
  }
}
