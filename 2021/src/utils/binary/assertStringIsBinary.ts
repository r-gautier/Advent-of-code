import { BinaryChar } from "./BinaryChar";

export function assertStringIsBinary(binary: string) {
  [...binary].forEach((char) => {
    if (char !== BinaryChar.True && char !== BinaryChar.False) {
      throw new Error(
        `The program expect to read binary input (chain of 0 and 1). The current input is not binary: ${binary}`
      );
    }
  });
}
