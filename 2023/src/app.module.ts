import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { SolveChallengeCommand } from './command/solveChallenge.command';
import { InfrastructureModule } from './common/infrastructure.module';

@Module({
  imports: [CommandModule, InfrastructureModule],
  providers: [SolveChallengeCommand],
})
export class AppModule {}
