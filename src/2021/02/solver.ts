const path = require('path');
import { parseFileToArray } from "@utils/parseFileToArray";
import { resolve }  from './02';

console.log("02 December 2021");
console.log("-----")

console.log("Initializing...")
const INPUT_PATH = path.join(__dirname, "../../../assets/2021/02/input.txt"); // UGLY

const commands = parseFileToArray(INPUT_PATH);
console.log("Initialization done.")

const firstResult = resolve(commands, false);
console.log("First puzzle solution: ", firstResult);

const secondResult = resolve(commands, true);
console.log("Second puzzle solution: ", secondResult);
