import { Injectable } from '@nestjs/common';
import { reverseString } from 'src/common/utils/reverseString';

@Injectable()
export class TrebuchetChallenge {
  public solve(document: string[]): number {
    return document.reduce((result, line) => {
      const firstDigit = this.findFirstDigit(line);
      const lastDigit = this.findLastDigit(line);
      return result + (firstDigit || 0) + (lastDigit || 0);
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
}
