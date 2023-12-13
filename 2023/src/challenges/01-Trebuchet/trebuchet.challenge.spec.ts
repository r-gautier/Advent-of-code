import { TrebuchetChallenge } from './trebuchet.challenge';

describe('TrebuchetChallenge', () => {
  let service: TrebuchetChallenge;

  beforeEach(async () => {
    service = new TrebuchetChallenge();
  });

  it('should return 0 for an empty document', () => {
    const document = [];

    const result = service.solve(document);

    expect(result).toEqual(0);
  });

  describe('when the document has only one line', () => {
    it('should return 0 if the line has no digit', () => {
      const document = ['abc'];

      const result = service.solve(document);

      expect(result).toEqual(0);
    });

    it.each([
      { line: '1', expected: 2 },
      { line: 'a1', expected: 2 },
      { line: 'a1b', expected: 2 },
      { line: 'a3b', expected: 6 },
    ])(
      'should return twice the digit if the line has only one digit (line $line)',
      ({ line, expected }) => {
        const document = [line];

        const result = service.solve(document);

        expect(result).toEqual(expected);
      },
    );

    it.each([
      { line: 'a1b2', expected: 3 },
      { line: 'dea3dv2', expected: 5 },
    ])(
      'should return the sum of the two digits if the line has two digits (line $line)',
      ({ line, expected }) => {
        const document = [line];

        const result = service.solve(document);

        expect(result).toEqual(expected);
      },
    );

    it('should return the sum of the first and last digit if the line has more than two digits', () => {
      const document = ['a1b2c3'];

      const result = service.solve(document);

      expect(result).toEqual(1 + 3);
    });
  });

  describe('when the document has more than one line', () => {
    it.each([
      { document: ['a1', 'b2'], expected: 1 * 2 + 2 * 2 },
      { document: ['a1bsd2', 'bzdz2aa3z'], expected: 1 + 2 + (2 + 3) },
      {
        document: ['bd', 'bd1dzd', 'b2dze3', 'b1dzdd3dzdz5'],
        expected: 0 + 1 * 2 + (2 + 3) + (1 + 5),
      },
    ])(
      'should return the sum of each line result (document $document)',
      ({ document, expected }: { document: string[]; expected: number }) => {
        const result = service.solve(document);

        expect(result).toEqual(expected);
      },
    );
  });
});
