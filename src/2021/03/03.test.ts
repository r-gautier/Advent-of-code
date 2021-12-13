import { parseFileToArray } from "@utils/parseFileToArray";

import { resolve } from "./03";
import path from "path";

describe("03 - Solve problem", () => {
  describe("first puzzle", () => {
    test("should return right result for example", () => {
      const INPUT_PATH = path.join(
        __dirname,
        "../../../assets/2021/03/example_01.txt"
      ); // UGLY
      const diagnosticReport = parseFileToArray(INPUT_PATH);

      const result = resolve(diagnosticReport);

      expect(result).toBe(198);
    });
  });

  describe("errors", () => {
    test("should throw an error if input is not binary", () => {
      const nonBinaryInput = "0161010";
      const diagnosticReport = [nonBinaryInput];

      const callback = () => resolve(diagnosticReport);

      expect(callback).toThrow();
    });

    test("should throw an error if a binary input is not of the expected size", () => {
      const sixBitsBinaryInputs = "0101010";
      const diagnosticReport = [sixBitsBinaryInputs];

      const callback = () => resolve(diagnosticReport);

      expect(callback).toThrow();
    });
  });
});
