const path = require('path');
import { parseFileToArray } from "@utils/parseFileToArray";
import { resolve }  from './01';

console.log("01 December 2021");
console.log("-----")

console.log("Initializing...")
const INPUT_PATH = path.join(__dirname, "../../../assets/2021/01/input.txt"); // UGLY

const stringValues = parseFileToArray(INPUT_PATH);
const depthMeasurements = stringValues.map(value => parseInt(value));
console.log("Initialization done.")

const firstResult = resolve(depthMeasurements, 1);
console.log("First puzzle solution: ", firstResult);

const secondResult = resolve(depthMeasurements, 3);
console.log("Second puzzle solution: ", secondResult)

