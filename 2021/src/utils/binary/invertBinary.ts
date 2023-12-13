import { BinaryChar } from "./BinaryChar";

export function invertBinary(binary: string) {
  let invertedBinary = "";

  for (const bit of binary) {
    switch (bit) {
      case BinaryChar.True:
        invertedBinary = invertedBinary.concat(BinaryChar.False);
        break;
      case BinaryChar.False:
        invertedBinary = invertedBinary.concat(BinaryChar.True);
        break;
      default:
        throw new Error(`Char ${bit} is a not bit`);
    }
  }

  return invertedBinary;
}
