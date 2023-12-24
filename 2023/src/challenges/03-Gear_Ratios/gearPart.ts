export class GearPart {
  private neighbors: GearPart[] = [];

  constructor(private representation: string) {}

  public addNeighbor(neighbor: GearPart): void {
    this.neighbors.push(neighbor);
  }

  public getNeighbors(): GearPart[] {
    return this.neighbors;
  }

  public addCharacterToRepresentation(char: string) {
    this.representation += char;
  }

  public getRepresentation(): string {
    return this.representation;
  }
}
