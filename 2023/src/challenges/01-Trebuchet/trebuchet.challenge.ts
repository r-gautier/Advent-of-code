import { Injectable } from '@nestjs/common';
import { reverseString } from 'src/common/utils/reverseString';

@Injectable()
export class TrebuchetChallenge {
  public solve(document: string[]): number {
    if (document.length === 0) {
      return 0;
    }

    const line = document[0];

    const firstDigit = this.findFirstDigit(line);
    const lastDigit = this.findLastDigit(line);
    return (firstDigit || 0) + (lastDigit || 0);
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
}
