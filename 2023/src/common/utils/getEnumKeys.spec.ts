import { getEnumKeys } from './getEnumKeys';

describe('getEnumKeys', () => {
  it('should return the keys of a string-value enum', () => {
    enum TestEnum {
      A = 'a',
      B = 'b',
      C = 'c',
    }

    const result = getEnumKeys(TestEnum);

    expect(result).toEqual(['A', 'B', 'C']);
  });

  it('should return the keys of a number-value enum', () => {
    enum TestEnum {
      A = 1,
      B = 2,
      C = 3,
    }

    const result = getEnumKeys(TestEnum);

    expect(result).toEqual(['A', 'B', 'C']);
  });
});
