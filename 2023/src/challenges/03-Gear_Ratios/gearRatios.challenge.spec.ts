import { SingleColumnParser } from 'src/common/parsers/singleColumn.parser';
import { GearRatiosChallenge } from './gearRatios.challenge';

describe('GearRatiosChallenge', () => {
  let gearRatiosChallenge: GearRatiosChallenge;

  beforeAll(() => {
    gearRatiosChallenge = new GearRatiosChallenge(new SingleColumnParser());
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
    ])('should solve for a simple line ($content)', ({ content, expected }) => {
      const result = gearRatiosChallenge.solve(content);

      expect(result).toEqual(expected);
    });
  });
});
