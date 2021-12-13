const path = require('path');
import { parseFileToArray } from "@utils/parseFileToArray";
import { resolve }  from './01';

const INPUT_PATH = path.join(__dirname, "../../../assets/2021/01/input.txt"); // UGLY

const stringValues = parseFileToArray(INPUT_PATH);
const depthMeasurements = stringValues.map(value => parseInt(value));

const result = resolve(depthMeasurements, 1);
console.log(result);

