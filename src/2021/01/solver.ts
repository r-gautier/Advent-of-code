const fs = require('fs')
const path = require('path');
import { resolve }  from './01';

const INPUT_PATH = path.join(__dirname, "../../../assets/2021/01/input.txt"); // UGLY
const NEW_LINE_SEPARATOR = "\n"

const content = fs.readFileSync(INPUT_PATH, 'utf8');
const depthMeasurements = parseData(content);

const result = resolve(depthMeasurements);
console.log(result);

function parseData(fileContent: string){
    const stringValues = fileContent.split(NEW_LINE_SEPARATOR);

    stringValues.pop();

    return stringValues.map(value => parseInt(value));
}
