import {
  BagPick,
  CubeColor,
  CubeConundrumChallenge,
  Game,
} from './cubeConundrum.challenge';

describe('CubeConundrumChallenge', () => {
  let cubeConundrumChallenge: CubeConundrumChallenge;

  beforeEach(async () => {
    cubeConundrumChallenge = new CubeConundrumChallenge();
  });

  describe('basic problem', () => {
    const RED_CUBE_LIMIT = 12;
    const GREEN_CUBE_LIMIT = 13;
    const BLUE_CUBE_LIMIT = 14;

    it('should return 0 for an empty list of games', () => {
      const games = [];

      const result = cubeConundrumChallenge.solve(games);

      expect(result).toEqual(0);
    });

    describe('when the game has only one play', () => {
      it('should return 0 for a game with no plays', () => {
        const game = buildSingleGameWithPlay([]);

        const result = cubeConundrumChallenge.solve([game]);

        expect(result).toEqual(0);
      });

      describe('when the play has a single color', () => {
        it.each([
          { color: CubeColor.Red, n: RED_CUBE_LIMIT + 1 },
          { color: CubeColor.Green, n: GREEN_CUBE_LIMIT + 1 },
          { color: CubeColor.Red, n: BLUE_CUBE_LIMIT + 1 },
        ])(
          'should return 1 if the play has color $color exceeding the limit',
          ({ color, n }) => {
            const play = buildSingleColorPlay(color, n);
            const game = buildSingleGameWithPlay([play]);

            const result = cubeConundrumChallenge.solve([game]);

            expect(result).toEqual(1);
          },
        );

        it.each([
          { color: CubeColor.Red, n: RED_CUBE_LIMIT - 1 },
          { color: CubeColor.Green, n: GREEN_CUBE_LIMIT - 1 },
          { color: CubeColor.Blue, n: BLUE_CUBE_LIMIT - 1 },
        ])(
          'should return 0 if the play has color $color not exceeding the limit',
          ({ color, n }) => {
            const play = buildSingleColorPlay(color, n);
            const game = buildSingleGameWithPlay([play]);

            const result = cubeConundrumChallenge.solve([game]);

            expect(result).toEqual(0);
          },
        );

        function buildSingleColorPlay(color: CubeColor, n: number) {
          return buildPlay({ [color]: n });
        }
      });

      describe('when the play has more than one color', () => {
        it.each([
          {
            color: CubeColor.Red,
            n: RED_CUBE_LIMIT + 1,
          },
          {
            color: CubeColor.Green,
            n: GREEN_CUBE_LIMIT + 1,
          },
          {
            color: CubeColor.Blue,
            n: BLUE_CUBE_LIMIT + 1,
          },
        ])(
          'should return 1 if the play has the color $color exceeding the limit',
          ({ color, n }) => {
            const play = buildPlayWithFilledColors({ [color]: n });
            const game = buildSingleGameWithPlay([play]);

            const result = cubeConundrumChallenge.solve([game]);

            expect(result).toEqual(1);
          },
        );

        it("should return 0 if the play doesn't exceed the limit", () => {
          const play = buildPlayWithFilledColors();
          const game = buildSingleGameWithPlay([play]);

          const result = cubeConundrumChallenge.solve([game]);

          expect(result).toEqual(0);
        });
      });
    });

    describe('when the game has more than one play', () => {
      it.each([
        {
          color: CubeColor.Red,
          plays: [
            buildPlay({ [CubeColor.Red]: 4 }),
            buildPlay({ [CubeColor.Red]: RED_CUBE_LIMIT + 1 }),
          ],
        },
        {
          color: CubeColor.Green,
          plays: [
            buildPlay({ [CubeColor.Green]: 4 }),
            buildPlay({ [CubeColor.Green]: GREEN_CUBE_LIMIT + 1 }),
          ],
        },
        {
          color: CubeColor.Blue,
          plays: [
            buildPlay({ [CubeColor.Blue]: 4 }),
            buildPlay({ [CubeColor.Blue]: BLUE_CUBE_LIMIT + 1 }),
          ],
        },
      ])(
        'should return 1 if one of the play of a color $color exceeds the limit',
        ({ plays }) => {
          const game = buildSingleGameWithPlay(plays);

          const result = cubeConundrumChallenge.solve([game]);

          expect(result).toEqual(1);
        },
      );
    });

    describe('when the game has more than one game', () => {
      it('should return the sum of impossible game id', () => {
        const games = [
          buildGame({ id: 1, plays: [buildImpossiblePlay(CubeColor.Red)] }),
          buildGame({ id: 2, plays: [buildPlay({ [CubeColor.Blue]: 10 })] }),
          buildGame({ id: 3, plays: [buildImpossiblePlay(CubeColor.Green)] }),
        ];

        const result = cubeConundrumChallenge.solve(games);

        expect(result).toEqual(1 + 3);
      });
    });

    function buildImpossiblePlay(color: CubeColor) {
      return buildPlay({
        [color]:
          Math.max(RED_CUBE_LIMIT, GREEN_CUBE_LIMIT, BLUE_CUBE_LIMIT) + 1,
      });
    }

    function buildSingleGameWithPlay(plays: Game['plays']) {
      return buildGame({ plays });
    }

    function buildGame(props: Partial<Game> = {}): Game {
      return {
        id: 1,
        plays: [],
        ...props,
      };
    }
  });
});

function buildPlayWithFilledColors(props: Partial<BagPick> = {}): BagPick {
  return buildPlay({
    [CubeColor.Red]: 2,
    [CubeColor.Green]: 3,
    [CubeColor.Blue]: 4,
    ...props,
  });
}

function buildPlay(props: Partial<BagPick> = {}): BagPick {
  return {
    [CubeColor.Red]: 0,
    [CubeColor.Green]: 0,
    [CubeColor.Blue]: 0,
    ...props,
  };
}
