import { Module } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';
import { ChallengesFacade } from './challenges.facade';

@Module({
  providers: [TrebuchetChallenge, ChallengesFacade],
  exports: [ChallengesFacade],
})
export class ChallengesModule {}
