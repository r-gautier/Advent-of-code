import {
  assertStringIsBinary,
  BinaryChar,
  convertBinaryToDecimal,
  invertBinary,
} from "@utils/binary";

export function resolve(diagnosticReport: Array<string>): number {
  const {
    mostCommonBits: gammaRateBinary,
    leastCommonBits: epsilonRateBinary,
  } = computeMostAndLeastCommonBits(diagnosticReport);

  return (
    convertBinaryToDecimal(gammaRateBinary) *
    convertBinaryToDecimal(epsilonRateBinary)
  );
}

export function resolveAdvanced(diagnosticReport: Array<string>): number {
  const oxygenGeneratorRateBinary =
    findUniqueBinaryForMostCommonBitCriteria(diagnosticReport);
  const CO2ScrubberRateBinary =
    findUniqueBinaryForLeastCommonBitCriteria(diagnosticReport);

  return (
    convertBinaryToDecimal(oxygenGeneratorRateBinary) *
    convertBinaryToDecimal(CO2ScrubberRateBinary)
  );
}

function computeMostAndLeastCommonBits(diagnosticReport: Array<string>) {
  const upBitsCounts = computeUpBitsCounts(diagnosticReport);

  const mostCommonBits = buildMostCommonBits(
    upBitsCounts,
    diagnosticReport.length
  );

  return {
    mostCommonBits: mostCommonBits,
    leastCommonBits: invertBinary(mostCommonBits),
  };
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
      bitsCounts[i] = computeUpBitsCount(diagnosticReport, i);
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
    assertStringIsBinary(binaryInput);
    assertBinaryInputIsExpectedSized();

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

    if (singleBitsCount >= numberOfBinaries / 2) {
      bit = BinaryChar.True;
    } else {
      bit = BinaryChar.False;
    }

    mostCommonBits = mostCommonBits.concat(bit);
  }

  return mostCommonBits;
}

function findUniqueBinaryForMostCommonBitCriteria(
  binaries: Array<string>
): string {
  let remainingBinaries = binaries;

  let currentBitIndex = 0;
  while (remainingBinaries.length > 1) {
    const mostCommonBit = isTrueMostCommonBit(
      remainingBinaries,
      currentBitIndex
    )
      ? BinaryChar.True
      : BinaryChar.False;

    remainingBinaries = remainingBinaries.filter(
      (binary) => binary[currentBitIndex] === mostCommonBit
    );
    ++currentBitIndex;
  }

  if (remainingBinaries.length === 0) {
    throw new Error(
      "The program could not find a unique binary for bit criteria"
    );
  }

  return remainingBinaries[0];
}

function findUniqueBinaryForLeastCommonBitCriteria(
  binaries: Array<string>
): string {
  let remainingBinaries = binaries;

  let currentBitIndex = 0;
  while (remainingBinaries.length > 1) {
    const leastCommonBit = isTrueMostCommonBit(
      remainingBinaries,
      currentBitIndex
    )
      ? BinaryChar.False
      : BinaryChar.True;

    remainingBinaries = remainingBinaries.filter(
      (binary) => binary[currentBitIndex] === leastCommonBit
    );
    ++currentBitIndex;
  }

  if (remainingBinaries.length === 0) {
    throw new Error(
      "The program could not find a unique binary for bit criteria"
    );
  }

  return remainingBinaries[0];
}

function isTrueMostCommonBit(
  binaries: Array<string>,
  bitIndex: number
): boolean {
  const upBitsCount = computeUpBitsCount(binaries, bitIndex);

  const binariesCount = binaries.length;
  return upBitsCount >= binariesCount / 2;
}

function computeUpBitsCount(binaries: Array<string>, bitIndex: number): number {
  let upBitsCount = 0;

  binaries.forEach((binary) => {
    const currentBit = binary[bitIndex];

    if (currentBit === BinaryChar.True) {
      ++upBitsCount;
    }
  });

  return upBitsCount;
}
