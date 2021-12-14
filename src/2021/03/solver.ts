const path = require("path");
import { parseFileToArray } from "@utils/parseFileToArray";
import { resolve } from "./03";

console.log("03 December 2021");
console.log("-----");

console.log("Initializing...");
const INPUT_PATH = path.join(__dirname, "../../../assets/2021/03/input.txt"); // UGLY

const diagnosticReport = parseFileToArray(INPUT_PATH);
console.log("Initialization done.");

const firstResult = resolve(diagnosticReport);
console.log("First puzzle solution: ", firstResult);
