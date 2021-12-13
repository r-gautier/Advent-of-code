import { parseFileToArray } from "@utils/parseFileToArray";

import { resolve } from './02';
import path from "path";

describe("02 - Solve problem", () => {
    describe("first puzzle", () => {
        test("should return 0 if horizontal position has not moved", () => {
            const firstVerticalDistance = 5;
            const secondVerticalDistance = 2;
            const commands = [
                `down ${firstVerticalDistance}`,
                `up ${secondVerticalDistance}`
            ]

            const result = resolve(commands);

            expect(result).toBe(0);
        })

        test("should return 0 if vertical position has not moved", () => {
            const verticalDistance = 5;
            const horizontalDistance = 10;
            const commands = [
                `down ${verticalDistance}`,
                `forward ${horizontalDistance}`,
                `up ${verticalDistance}`
            ]

            const result = resolve(commands);

            expect(result).toBe(0);
        })

        test("should return right result for example", () => {
            const INPUT_PATH = path.join(__dirname, "../../../assets/2021/02/example_01.txt"); // UGLY
            const commands = parseFileToArray(INPUT_PATH);

            const result = resolve(commands);

            expect(result).toBe(150);
        })
    })
});
