import { parseFileToArray } from "@utils/parseFileToArray";

import { resolve, resolveAdvanced } from "./03";
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

  describe("second puzzle", () => {
    test("should return right result for example", () => {
      const INPUT_PATH = path.join(
        __dirname,
        "../../../assets/2021/03/example_01.txt"
      ); // UGLY
      const diagnosticReport = parseFileToArray(INPUT_PATH);

      const result = resolveAdvanced(diagnosticReport);

      expect(result).toBe(230);
    });
  });

  describe("errors", () => {
    test("should throw an error if input is not binary", () => {
      const nonBinaryInput = "0161010";
      const diagnosticReport = [nonBinaryInput];

      const callback = () => resolve(diagnosticReport);

      expect(callback).toThrow();
    });

    test("should throw an error if there is two binaries of different size", () => {
      const sixBitsBinaryInput = "0101010";
      const fourBitsBinaryInput = "0110";
      const diagnosticReport = [sixBitsBinaryInput, fourBitsBinaryInput];

      const callback = () => resolve(diagnosticReport);

      expect(callback).toThrow();
    });
  });
});
