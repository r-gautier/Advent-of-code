import { Injectable } from '@nestjs/common';
import { getEnumKeys } from 'src/common/utils/getEnumKeys';
import { reverseString } from 'src/common/utils/reverseString';
import { DeprecatedChallenge } from '../common/interfaces/challenge.interface';

enum SpelledDigit {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
}

const DIGIT_REGEX_PATTERN = '\\d';
const SPELLED_DIGIT_REGEX_PATTERN = getEnumKeys(SpelledDigit).join('|');

@Injectable()
export class TrebuchetChallenge
  implements DeprecatedChallenge<string[], number>
{
  public solve(document: string[]): number {
    return document.reduce((result, line) => {
      const firstDigit = this.findFirstDigit(line);
      const lastDigit = this.findLastDigit(line);
      return result + (firstDigit || 0) * 10 + (lastDigit || 0);
    }, 0);
  }

  private findLastDigit(line: string): number | undefined {
    const reversedLine = reverseString(line);
    return this.findFirstDigit(reversedLine);
  }

  private findFirstDigit(line: string): number | undefined {
    const digitRegex = new RegExp('\\d');
    const index = line.search(digitRegex);
    return index >= 0 ? parseInt(line[index]) : undefined;
  }

  public solveAdvanced(document: string[]): number {
    return document.reduce((result, line) => {
      const firstDigit = this.findFirstRealDigit(line);
      const lastDigit = this.findLastRealDigit(line);
      return result + (firstDigit || 0) * 10 + (lastDigit || 0);
    }, 0);
  }

  private findFirstRealDigit(line: string): number | undefined {
    const digits = this.findDigits(line);

    if (digits.length === 0) {
      return undefined;
    }

    return this.convertStringDigitToNumber(digits[0]);
  }

  private findLastRealDigit(line: string): number | undefined {
    const digits = this.findDigits(line);

    if (digits.length === 0) {
      return undefined;
    }

    return this.convertStringDigitToNumber(digits[digits.length - 1]);
  }

  private findDigits(line: string): string[] {
    const digitRegex = new RegExp(
      `(?=(${DIGIT_REGEX_PATTERN}|${SPELLED_DIGIT_REGEX_PATTERN}))`,
      'g',
    );
    const matches = line.matchAll(digitRegex);

    return [...matches]
      .filter((match) => match[1] !== undefined)
      .flatMap((match) => match[1]);
  }

  private convertStringDigitToNumber(digit: string): number {
    const numberValue = parseInt(digit);
    if (!isNaN(numberValue)) {
      return numberValue;
    }

    const enumValue = SpelledDigit[digit];

    if (!enumValue) {
      throw new Error(`Unknown digit: ${digit}`);
    }

    return enumValue;
  }
}
