export function isStringANumber(str: string): boolean {
  return !isNaN(Number(str));
}
