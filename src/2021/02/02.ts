const COMMAND_SEPARATOR = " ";

enum Direction {
  Up = "up",
  Down = "down",
  Forward = "forward",
}

type Instruction = {
  direction: Direction;
  distance: number;
};

export function resolve(commands: Array<string>, shouldUseAim = false): number {
  const position = { horizontal: 0, vertical: 0, aim: 0 };

  commands.forEach((command) => {
    const instruction = convertCommandToInstruction(command);

    shouldUseAim
      ? executeInstructionWithAim(instruction)
      : executeInstruction(instruction);
  });

  return position.horizontal * position.vertical;

  function convertCommandToInstruction(command: string): Instruction {
    const [direction, distance] = command.split(COMMAND_SEPARATOR) as [
      Direction,
      string
    ];

    return { direction, distance: parseInt(distance) };
  }

  function executeInstruction(instruction: Instruction): void {
    switch (instruction.direction) {
      case Direction.Down:
        position.vertical += instruction.distance;
        break;
      case Direction.Up:
        position.vertical -= instruction.distance;
        break;
      case Direction.Forward:
        position.horizontal += instruction.distance;
        break;
    }
  }

  function executeInstructionWithAim(instruction: Instruction): void {
    switch (instruction.direction) {
      case Direction.Down:
        position.aim += instruction.distance;
        break;
      case Direction.Up:
        position.aim -= instruction.distance;
        break;
      case Direction.Forward:
        position.horizontal += instruction.distance;
        position.vertical += position.aim * instruction.distance;
        break;
    }
  }
}
