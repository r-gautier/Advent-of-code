import {
  BinaryChar,
  convertBinaryToDecimal,
  invertBinary,
} from "@utils/binary";

export function resolve(diagnosticReport: Array<string>): number {
  const upBitsCounts = computeUpBitsCounts(diagnosticReport);

  const mostCommonBits = buildMostCommonBits(
    upBitsCounts,
    diagnosticReport.length
  );

  const gammaRateBinary = mostCommonBits;
  const epsilonRateBinary = invertBinary(mostCommonBits);

  return (
    convertBinaryToDecimal(gammaRateBinary) *
    convertBinaryToDecimal(epsilonRateBinary)
  );
}

function computeUpBitsCounts(diagnosticReport: Array<string>): Array<number> {
  const binarySize = diagnosticReport[0].length;
  const bitsCounts = new Array(binarySize).fill(0);

  diagnosticReport.forEach((binaryInput, index) => {
    assertBinaryInputIsValid({
      binaryInput,
      index,
      expectedBinarySize: binarySize,
    });

    for (let i = 0; i < binarySize; ++i) {
      const currentBit = binaryInput[i];

      if (currentBit === BinaryChar.True) {
        ++bitsCounts[i];
      }
    }
  });

  return bitsCounts;

  function assertBinaryInputIsValid({
    binaryInput,
    index,
    expectedBinarySize,
  }: {
    binaryInput: string;
    index: number;
    expectedBinarySize: number;
  }) {
    assertEveryCharIsBit();
    assertBinaryInputIsExpectedSized();

    function assertEveryCharIsBit() {
      [...binaryInput].forEach((char) => {
        if (char !== BinaryChar.True && char !== BinaryChar.False) {
          throw new Error(
            `The program expect to read binary input (chain of 0 and 1). The current input is not binary: ${binaryInput}`
          );
        }
      });
    }

    function assertBinaryInputIsExpectedSized() {
      if (binaryInput.length !== expectedBinarySize) {
        throw new Error(
          `The program expect to read ${expectedBinarySize}-bits binary input.` +
            `The current binary input (value: ${binaryInput}, index: ${index}) length is: ${binaryInput.length}`
        );
      }
    }
  }
}

function buildMostCommonBits(
  upBitsCounts: Array<number>,
  numberOfBinaries: number
): string {
  let mostCommonBits = "";

  for (const singleBitsCount of upBitsCounts) {
    let bit;

    if (singleBitsCount > numberOfBinaries / 2) {
      bit = BinaryChar.True;
    } else {
      bit = BinaryChar.False;
    }

    mostCommonBits = mostCommonBits.concat(bit);
  }

  return mostCommonBits;
}
