export function getEnumKeys(enumeration: Record<any, any>): string[] {
  return Object.keys(enumeration).filter(
    (key) => typeof key === 'string' && isNaN(parseInt(key)),
  );
}
