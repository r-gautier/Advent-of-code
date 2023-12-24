import { Module } from '@nestjs/common';
import { TrebuchetChallenge } from './01-Trebuchet/trebuchet.challenge';
import { ChallengesFacade } from './challenges.facade';
import { CubeConundrumChallenge } from './02-Cube_Conundrum/cubeConundrum.challenge';
import { CubeConundrumParser } from './02-Cube_Conundrum/cubeConundrum.parser';
import { GearRatiosChallenge } from './03-Gear_Ratios/gearRatios.challenge';
import { GearRatiosParser } from './03-Gear_Ratios/gearRatios.parser';
import { ScratchCardsChallenge } from './04-Scratchcards/scratchCards.challenge';

@Module({
  providers: [
    TrebuchetChallenge,
    CubeConundrumChallenge,
    CubeConundrumParser,
    GearRatiosChallenge,
    GearRatiosParser,
    ScratchCardsChallenge,
    ChallengesFacade,
  ],
  exports: [ChallengesFacade],
})
export class ChallengesModule {}
