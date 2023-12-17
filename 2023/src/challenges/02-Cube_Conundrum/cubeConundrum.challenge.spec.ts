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
      it('should return 1 for a game with no plays', () => {
        const game = buildSingleGameWithPlay([]);

        const result = cubeConundrumChallenge.solve([game]);

        expect(result).toEqual(1);
      });

      describe('when the play has a single color', () => {
        it.each([
          { color: CubeColor.Red, n: RED_CUBE_LIMIT + 1 },
          { color: CubeColor.Green, n: GREEN_CUBE_LIMIT + 1 },
          { color: CubeColor.Red, n: BLUE_CUBE_LIMIT + 1 },
        ])(
          'should return 0 if the play has color $color exceeding the limit',
          ({ color, n }) => {
            const play = buildSingleColorPlay(color, n);
            const game = buildSingleGameWithPlay([play]);

            const result = cubeConundrumChallenge.solve([game]);

            expect(result).toEqual(0);
          },
        );

        it.each([
          { color: CubeColor.Red, n: RED_CUBE_LIMIT - 1 },
          { color: CubeColor.Green, n: GREEN_CUBE_LIMIT - 1 },
          { color: CubeColor.Blue, n: BLUE_CUBE_LIMIT - 1 },
        ])(
          'should return 1 if the play has color $color not exceeding the limit',
          ({ color, n }) => {
            const play = buildSingleColorPlay(color, n);
            const game = buildSingleGameWithPlay([play]);

            const result = cubeConundrumChallenge.solve([game]);

            expect(result).toEqual(1);
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
          'should return 0 if the play has the color $color exceeding the limit',
          ({ color, n }) => {
            const play = buildPlayWithFilledColors({ [color]: n });
            const game = buildSingleGameWithPlay([play]);

            const result = cubeConundrumChallenge.solve([game]);

            expect(result).toEqual(0);
          },
        );

        it("should return 1 if the play doesn't exceed the limit", () => {
          const play = buildPlayWithFilledColors();
          const game = buildSingleGameWithPlay([play]);

          const result = cubeConundrumChallenge.solve([game]);

          expect(result).toEqual(1);
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
        'should return 0 if one of the play of a color $color exceeds the limit',
        ({ plays }) => {
          const game = buildSingleGameWithPlay(plays);

          const result = cubeConundrumChallenge.solve([game]);

          expect(result).toEqual(0);
        },
      );
    });

    describe('when the game has more than one game', () => {
      it('should return the sum of possible game id', () => {
        const games = [
          buildGame({ id: 1, plays: [buildPlay({ [CubeColor.Red]: 2 })] }),
          buildGame({ id: 2, plays: [buildPlay({ [CubeColor.Blue]: 10 })] }),
          buildGame({ id: 3, plays: [buildImpossiblePlay(CubeColor.Green)] }),
        ];

        const result = cubeConundrumChallenge.solve(games);

        expect(result).toEqual(1 + 2);
      });
    });

    it('should solve the challenge example', () => {
      const games = buildBasicProblemExample();

      const result = cubeConundrumChallenge.solve(games);

      expect(result).toEqual(1 + 2 + 5);
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
  });

  describe('advanced problem', () => {
    it('should solve the challenge example', () => {
      const games = buildAdvancedProblemExample();

      const result = cubeConundrumChallenge.solveAdvanced(games);

      expect(result).toEqual(2286);
    });
  });
});

function buildBasicProblemExample(): Game[] {
  return [
    buildGame({
      id: 1,
      plays: [
        buildPlay({ [CubeColor.Blue]: 3, [CubeColor.Red]: 4 }),
        buildPlay({
          [CubeColor.Red]: 1,
          [CubeColor.Green]: 2,
          [CubeColor.Blue]: 6,
        }),
        buildPlay({
          [CubeColor.Green]: 2,
        }),
      ],
    }),
    buildGame({
      id: 2,
      plays: [
        buildPlay({ [CubeColor.Blue]: 1, [CubeColor.Green]: 2 }),
        buildPlay({
          [CubeColor.Green]: 3,
          [CubeColor.Blue]: 4,
          [CubeColor.Red]: 1,
        }),
        buildPlay({
          [CubeColor.Green]: 1,
          [CubeColor.Blue]: 2,
        }),
      ],
    }),
    buildGame({
      id: 3,
      plays: [
        buildPlay({
          [CubeColor.Green]: 8,
          [CubeColor.Blue]: 6,
          [CubeColor.Red]: 20,
        }),
        buildPlay({
          [CubeColor.Blue]: 5,
          [CubeColor.Red]: 4,
          [CubeColor.Green]: 13,
        }),
        buildPlay({
          [CubeColor.Green]: 5,
          [CubeColor.Red]: 2,
        }),
      ],
    }),
    buildGame({
      id: 4,
      plays: [
        buildPlay({
          [CubeColor.Green]: 1,
          [CubeColor.Red]: 3,
          [CubeColor.Blue]: 6,
        }),
        buildPlay({
          [CubeColor.Green]: 3,
          [CubeColor.Red]: 6,
        }),
        buildPlay({
          [CubeColor.Green]: 3,
          [CubeColor.Blue]: 15,
          [CubeColor.Red]: 14,
        }),
      ],
    }),
    buildGame({
      id: 5,
      plays: [
        buildPlay({
          [CubeColor.Red]: 6,
          [CubeColor.Blue]: 1,
          [CubeColor.Green]: 3,
        }),
        buildPlay({
          [CubeColor.Blue]: 2,
          [CubeColor.Red]: 1,
          [CubeColor.Green]: 2,
        }),
      ],
    }),
  ];
}

function buildAdvancedProblemExample(): Game[] {
  return [
    buildGame({
      id: 1,
      plays: [
        buildPlay({
          [CubeColor.Blue]: 3,
          [CubeColor.Red]: 4,
        }),
        buildPlay({
          [CubeColor.Red]: 1,
          [CubeColor.Green]: 2,
          [CubeColor.Blue]: 6,
        }),
        buildPlay({
          [CubeColor.Green]: 2,
        }),
      ],
    }),
    buildGame({
      id: 2,
      plays: [
        buildPlay({
          [CubeColor.Blue]: 1,
          [CubeColor.Green]: 2,
        }),
        buildPlay({
          [CubeColor.Green]: 3,
          [CubeColor.Blue]: 4,
          [CubeColor.Red]: 1,
        }),
        buildPlay({
          [CubeColor.Green]: 1,
          [CubeColor.Blue]: 1,
        }),
      ],
    }),
    buildGame({
      id: 3,
      plays: [
        buildPlay({
          [CubeColor.Green]: 8,
          [CubeColor.Blue]: 6,
          [CubeColor.Red]: 20,
        }),
        buildPlay({
          [CubeColor.Blue]: 5,
          [CubeColor.Red]: 4,
          [CubeColor.Green]: 13,
        }),
        buildPlay({
          [CubeColor.Green]: 5,
          [CubeColor.Red]: 1,
        }),
      ],
    }),
    buildGame({
      id: 4,
      plays: [
        buildPlay({
          [CubeColor.Green]: 1,
          [CubeColor.Red]: 3,
          [CubeColor.Blue]: 6,
        }),
        buildPlay({
          [CubeColor.Green]: 3,
          [CubeColor.Red]: 6,
        }),
        buildPlay({
          [CubeColor.Green]: 3,
          [CubeColor.Blue]: 15,
          [CubeColor.Red]: 14,
        }),
      ],
    }),
    buildGame({
      id: 5,
      plays: [
        buildPlay({
          [CubeColor.Red]: 6,
          [CubeColor.Blue]: 1,
          [CubeColor.Green]: 3,
        }),
        buildPlay({
          [CubeColor.Blue]: 2,
          [CubeColor.Red]: 1,
          [CubeColor.Green]: 2,
        }),
      ],
    }),
  ];
}

function buildGame(props: Partial<Game> = {}): Game {
  return {
    id: 1,
    plays: [],
    ...props,
  };
}

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
