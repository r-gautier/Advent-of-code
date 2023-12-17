import { Module } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';
import { ChallengesFacade } from './challenges.facade';
import { CubeConundrumChallenge } from './02-Cube_Conundrum/cubeConundrum.challenge';
import { CubeConundrumParser } from './02-Cube_Conundrum/cubeConundrum.parser';

@Module({
  providers: [
    TrebuchetChallenge,
    CubeConundrumChallenge,
    CubeConundrumParser,
    ChallengesFacade,
  ],
  exports: [ChallengesFacade],
})
export class ChallengesModule {}
