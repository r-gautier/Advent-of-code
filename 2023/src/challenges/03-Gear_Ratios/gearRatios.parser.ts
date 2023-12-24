import { Parser } from 'src/common/parsers/parser.interface';
import { GearPart } from './gearPart';
import { Injectable } from '@nestjs/common';
import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { isStringANumber } from 'src/common/utils/isStringANumber';

@Injectable()
export class GearRatiosParser implements Parser<GearPart[]> {
  private readonly engineSchematic: Array<Array<GearPart>> = [];

  constructor(private readonly singleColumnParser: SingleColumnParser) {}

  public parse(content: string): GearPart[] {
    const lines = this.singleColumnParser.parse(content);

    if (lines.length === 0) {
      return [];
    }

    lines.map((singleLine) => {
      const singleLineSchematic: Array<GearPart> = [];
      this.engineSchematic.push(singleLineSchematic);
      const characters = singleLine.split('');
      for (let i = 0; i < characters.length; i++) {
        const currentChar = characters[i];

        if (!isStringANumber(currentChar)) {
          singleLineSchematic.push(new GearPart(currentChar));
          continue;
        }

        const currentGearPart = new GearPart(currentChar);
        singleLineSchematic.push(currentGearPart);

        let j = i + 1;
        while (isStringANumber(characters[j])) {
          currentGearPart.addCharacterToRepresentation(characters[j]);
          singleLineSchematic.push(currentGearPart);
          j++;
        }
        i = j - 1;
      }
    });

    this.setRelationsWithNeighbor();

    return this.engineSchematic.reduce((parts, row) => {
      row.forEach((part) => {
        if (!parts.includes(part)) {
          parts.push(part);
        }
      });
      return parts;
    }, []);
  }

  private setRelationsWithNeighbor() {
    this.engineSchematic.forEach((row, rowIndex) => {
      row.forEach((gearPart, columnIndex) => {
        const neighborIndexes = this.generateNeighborIndexes(
          rowIndex,
          columnIndex,
        );

        neighborIndexes.forEach(([neighborRowIndex, neighborColumnIndex]) => {
          const neighbor =
            this.engineSchematic[neighborRowIndex]?.[neighborColumnIndex];
          if (
            neighbor &&
            neighbor !== gearPart &&
            !gearPart.getNeighbors().includes(neighbor)
          ) {
            gearPart.addNeighbor(neighbor);
          }
        });
      });
    });
  }

  private generateNeighborIndexes(
    rowIndex: number,
    columnIndex: number,
  ): [number, number][] {
    return [
      [rowIndex, columnIndex - 1], // left
      [rowIndex, columnIndex + 1], // right
      [rowIndex - 1, columnIndex], // top
      [rowIndex + 1, columnIndex], // bottom
      [rowIndex - 1, columnIndex - 1], // top left
      [rowIndex - 1, columnIndex + 1], // top right
      [rowIndex + 1, columnIndex - 1], // bottom left
      [rowIndex + 1, columnIndex + 1], // bottom right
    ];
  }
}
