/**
 * @deprecated Use the abstract Challenge instead of the interface
 */
export interface DeprecatedChallenge<Input, Result> {
  solve(document: Input): Result;
  solveAdvanced(document): Result;
}
