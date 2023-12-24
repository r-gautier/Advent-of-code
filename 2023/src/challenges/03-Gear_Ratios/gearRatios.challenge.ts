import { Challenge } from '../common/services/challenge.abstract';
import { Injectable } from '@nestjs/common';
import { isStringANumber } from 'src/common/utils/isStringANumber';
import { GearRatiosParser } from './gearRatios.parser';
import { GearPart } from './gearPart';

@Injectable()
export class GearRatiosChallenge extends Challenge<GearPart[], number> {
  constructor(parser: GearRatiosParser) {
    super(parser);
  }

  protected computeBasicSolution(engineSchematic: GearPart[]): number {
    const potentialPartNumbers = engineSchematic.filter((part) =>
      isStringANumber(part.getRepresentation()),
    );

    const partNumbers = potentialPartNumbers.filter((part) =>
      this.isPartNearASymbol(part),
    );

    return partNumbers.reduce((sum, part) => {
      return sum + parseInt(part.getRepresentation());
    }, 0);
  }

  private isPartNearASymbol(part: GearPart): boolean {
    return part.getNeighbors().some((neighbor) => this.isPartASymbol(neighbor));
  }

  private isPartASymbol(part: GearPart): boolean {
    const representation = part.getRepresentation();
    return !isStringANumber(representation) && representation !== '.';
  }

  protected computeAdvancedSolution(engineSchematic: GearPart[]): number {
    const potentialGears = engineSchematic.filter(
      (part) => part.getRepresentation() === '*',
    );

    const gears = potentialGears.filter((gear) =>
      this.doesGearHaveTwoPartNumbers(gear),
    );

    return gears.reduce((sum, gear) => {
      const partNumbers = gear
        .getNeighbors()
        .filter((neighbor) => isStringANumber(neighbor.getRepresentation()));

      return (
        sum +
        parseInt(partNumbers[0].getRepresentation()) *
          parseInt(partNumbers[1].getRepresentation())
      );
    }, 0);
  }

  private doesGearHaveTwoPartNumbers(gear: GearPart): boolean {
    return (
      gear
        .getNeighbors()
        .filter((neighbor) => isStringANumber(neighbor.getRepresentation()))
        .length === 2
    );
  }
}
