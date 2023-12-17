import { Parser } from 'src/common/parsers/parser.interface';
import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { BagPick, CubeColor, Game } from './cubeConundrum.challenge';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CubeConundrumParser implements Parser<Game[]> {
  constructor(private readonly singleColumnParser: SingleColumnParser) {}

  public parse(content: string): Game[] {
    const lines = this.singleColumnParser.parse(content);

    return lines.map((line) => {
      console.log(line);
      const [gameString, playsString] = line.split(': ');

      return {
        id: this.parseGameId(gameString),
        plays: this.parsePlays(playsString),
      };
    });
  }

  private parseGameId(gameString: string): number {
    const regex = new RegExp('\\d+', 'g');
    const matches = gameString.match(regex);

    if (!matches) throw new Error(`Invalid game string: ${gameString}`);

    return parseInt(matches[0]);
  }

  private parsePlays(playsString: string): BagPick[] {
    const multiplePlayStrings = playsString.split('; ');

    return multiplePlayStrings.map((playString) => {
      const cubeStrings = playString.split(', ');

      return cubeStrings.reduce(
        (play, singleCubeString) => {
          const [countString, color] = singleCubeString.split(' ');
          play[color] += parseInt(countString);
          return play;
        },
        {
          [CubeColor.Red]: 0,
          [CubeColor.Green]: 0,
          [CubeColor.Blue]: 0,
        },
      );
    });
  }
}
