const fs = require("fs");

const NEW_LINE_SEPARATOR = "\n";

export function parseFileToArray(filePath: string): Array<string> {
  const fileContent = fs.readFileSync(filePath, "utf8");

  const values = fileContent.split(NEW_LINE_SEPARATOR);
  values.pop(); // last line is empty

  return values;
}
