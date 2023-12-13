import { Command, Positional } from 'nestjs-command';
import {
  FILE_READER_TOKEN,
  FileReader,
} from '../common/fileReader/fileReader.interface';
import { Inject, Logger } from '@nestjs/common';

export class SolveChallengeCommand {
  constructor(
    @Inject(FILE_READER_TOKEN) private readonly fileReader: FileReader,
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
  ) {
    const fileContent = await this.fileReader.read(
      this.buildChallengePath(challengeNumber),
    );
    Logger.log(`Challenge ${challengeNumber} has ${fileContent.length} lines`);
    return fileContent.length;
  }

  private buildChallengePath(challengeNumber: number): string {
    return `${this.formatChallengeNumber(challengeNumber)}/input.txt`;
  }

  private formatChallengeNumber(challengeNumber: number): string {
    return challengeNumber.toString().padStart(2, '0');
  }
}
