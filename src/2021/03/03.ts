import {
  BinaryChar,
  convertBinaryToDecimal,
  invertBinary,
} from "@utils/binary";

const NUMBER_OF_BITS = 5;

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
  const bitsCounts = new Array(5).fill(0);

  diagnosticReport.forEach((binaryInput, index) => {
    assertBinaryInputIsValid(binaryInput, index);

    for (let i = 0; i < NUMBER_OF_BITS; ++i) {
      const currentBit = binaryInput[i];

      if (currentBit === BinaryChar.True) {
        ++bitsCounts[i];
      }
    }
  });

  return bitsCounts;

  function assertBinaryInputIsValid(binaryInput: string, index: number) {
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
      if (binaryInput.length !== NUMBER_OF_BITS) {
        throw new Error(
          `The program expect to read ${NUMBER_OF_BITS}-bits binary input.` +
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

  for (let i = 0; i < NUMBER_OF_BITS; ++i) {
    let bit;
    const singleBitsCount = upBitsCounts[i];

    if (singleBitsCount > numberOfBinaries / 2) {
      bit = BinaryChar.True;
    } else {
      bit = BinaryChar.False;
    }

    mostCommonBits = mostCommonBits.concat(bit);
  }

  return mostCommonBits;
}
