import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { SolveChallengeCommand } from './command/solveChallenge.command';
import { InfrastructureModule } from './common/infrastructure.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [CommandModule, InfrastructureModule, ChallengesModule],
  providers: [SolveChallengeCommand],
})
export class AppModule {}
