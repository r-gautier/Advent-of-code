import { Module } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';

@Module({
  providers: [TrebuchetChallenge],
})
export class ChallengesModule {}
