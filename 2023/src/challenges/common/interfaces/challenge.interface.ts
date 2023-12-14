export interface Challenge<Input, Result> {
  solve(document: Input): Result;
  solveAdvanced(document): Result;
}
