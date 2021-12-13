import { parseFileToArray } from "@utils/parseFileToArray";

import { resolve } from './01';
import path from "path";

describe("01 - Solve problem", () => {
    let randomDepthMeasurements: Array<number>;

    beforeEach(() => {
        randomDepthMeasurements = generateRandomArray(50, 1000);
    })

    test("should return result less or equal than n-1", () => {
        const depthMeasurements = randomDepthMeasurements;

        const result = resolve(depthMeasurements);

        expect(result).toBeLessThanOrEqual(depthMeasurements.length - 1);
    })

    test("should return 0 for desc sorted array", () => {
        const depthMeasurements = randomDepthMeasurements.sort((a,b) => (a-b)).reverse();

        const result = resolve(depthMeasurements);

        expect(result).toBe(0);
    })

    test("should find right result for first puzzle", () => {
        const INPUT_PATH = path.join(__dirname, "../../../assets/2021/01/input.txt"); // UGLY
        const stringValues = parseFileToArray(INPUT_PATH);
        const depthMeasurements = stringValues.map((value) => parseInt(value));

        const result = resolve(depthMeasurements);

        expect(result).toBe(1292);
    })
})

function generateRandomArray(length: number, max: number){
    return [...new Array(length)]
        .map(() => Math.round(Math.random() * max));
}

