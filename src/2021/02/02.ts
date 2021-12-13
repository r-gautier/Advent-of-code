const COMMAND_SEPARATOR = ' ';

enum Direction {
    Up = "up",
    Down = "down",
    Forward = "forward"
}

type Instruction = {
    direction: Direction,
    distance: number
}

export function resolve(commands: Array<string>): number {
    const position = {horizontal: 0, vertical: 0};

    commands.forEach((command) => {
        const {direction, distance} = convertCommandToInstruction(command);

        switch (direction){
            case Direction.Down:
                position.vertical += distance;
                break;
            case Direction.Up:
                position.vertical -= distance;
                break;
            case Direction.Forward:
                position.horizontal += distance;
                break;
        }
    });

    return position.horizontal * position.vertical;

    function convertCommandToInstruction(command: string): Instruction {
        const [direction, distance] = command.split(COMMAND_SEPARATOR) as [Direction, string];

        return {direction, distance: parseInt(distance)};
    }
}
