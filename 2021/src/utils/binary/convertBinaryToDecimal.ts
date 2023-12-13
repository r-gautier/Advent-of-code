import { BinaryChar } from "./BinaryChar";

export function convertBinaryToDecimal(binary: string): number {
  let decimalNumber = 0;

  const n = binary.length - 1;
  for (let i = 0; i <= n; ++i) {
    const bit = binary[i];
    if (bit === BinaryChar.True) {
      decimalNumber += 2 ** (n - i);
    }
  }

  return decimalNumber;
}
