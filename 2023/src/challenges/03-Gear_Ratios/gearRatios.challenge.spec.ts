import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { GearRatiosChallenge } from './gearRatios.challenge';
import { GearRatiosParser } from './gearRatios.parser';

describe('GearRatiosChallenge', () => {
  let gearRatiosChallenge: GearRatiosChallenge;

  beforeEach(() => {
    gearRatiosChallenge = new GearRatiosChallenge(
      new GearRatiosParser(new SingleColumnParser()),
    );
  });

  describe('basic problem', () => {
    it.each([{ content: '123' }, { content: '.' }, { content: '#' }])(
      'should return 0 for a single part ($content)',
      ({ content }) => {
        const result = gearRatiosChallenge.solve(content);

        expect(result).toEqual(0);
      },
    );

    it.each([
      { content: '#1', expected: 1 },
      { content: '1#', expected: 1 },
      { content: '2#', expected: 2 },
      { content: '.1', expected: 0 },
      { content: '12#', expected: 12 },
      { content: '1#2', expected: 3 },
      { content: '1#.2', expected: 1 },
      { content: '1..#...3', expected: 0 },
    ])('should solve for a simple line ($content)', ({ content, expected }) => {
      const result = gearRatiosChallenge.solve(content);

      expect(result).toEqual(expected);
    });

    it.each([
      {
        content: ['...2...', '...#...'],
        expected: 2,
      },
      {
        content: ['...2...', '......#'],
        expected: 0,
      },
      {
        content: ['...2...', '.......', '...#...'],
        expected: 0,
      },
    ])('should solve for multiple lines', ({ content, expected }) => {
      const result = gearRatiosChallenge.solve(generateMultipleRows(content));

      expect(result).toEqual(expected);
    });

    it('should solve the challenge example', () => {
      const input = generateMultipleRows([
        '467..114..',
        '...*......',
        '..35..633.',
        '......#...',
        '617*......',
        '.....+.58.',
        '..592.....',
        '......755.',
        '...$.*....',
        '.664.598..',
      ]);

      const result = gearRatiosChallenge.solve(input);

      expect(result).toEqual(4361);
    });
  });
});

function generateMultipleRows(rows: string[]): string {
  return rows.join('\n');
}
