import { Command, Positional, Option } from 'nestjs-command';
import {
  FILE_READER_TOKEN,
  FileReader,
} from '../common/fileReader/fileReader.interface';
import { Inject, Logger } from '@nestjs/common';
import { ChallengesFacade } from 'src/challenges/challenges.facade';

export class SolveChallengeCommand {
  constructor(
    @Inject(FILE_READER_TOKEN) private readonly fileReader: FileReader,
    private readonly challengeFacade: ChallengesFacade,
  ) {}

  @Command({
    command: 'solve:challenge <number>',
    describe: 'solve advent of code challenge',
  })
  async execute(
    @Positional({
      name: 'number',
      describe: 'Challenge number',
      type: 'number',
    })
    challengeNumber: number,
    @Option({
      name: 'advanced',
      describe: 'solve advanced challenge',
      type: 'boolean',
      alias: 'a',
      default: false,
    })
    isAdvanced: boolean,
  ) {
    const fileContent = await this.fileReader.read(
      this.buildChallengePath(challengeNumber),
    );

    const result = this.challengeFacade.solve(
      { number: challengeNumber, isAdvanced },
      fileContent,
    );
    Logger.log(
      `Challenge n°${challengeNumber} ${
        isAdvanced ? 'advanced*' : ''
      } result: ${result}`,
    );
    return result;
  }

  private buildChallengePath(challengeNumber: number): string {
    return `${this.formatChallengeNumber(challengeNumber)}/input.txt`;
  }

  private formatChallengeNumber(challengeNumber: number): string {
    return challengeNumber.toString().padStart(2, '0');
  }
}
