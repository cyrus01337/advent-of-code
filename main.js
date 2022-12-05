/*

    Allow the entire project to be ran via CLI and comply to the following formats:

    On initial run, display ASCII text commemorating AoC, with my name in plaintext underneath
    After, "[pkgm] start --day 12" should run the code exported by ./12/1.js
    If the 2nd part needs to run, "[pkgm] start --day 12 --part 2" should run the code exported by ./12/2.js
    If positional arguments are expected, "[pkgm] start <options> ..." will suffice as arguments (subject to change)

*/
import fs from "fs";
import path from "path";
import process from "process";

import days from "./src/days/index.js";
import parser from "./src/parser.js";

const { day, part, quiet, _: args } = parser.argv;
const {
    requires,
    default: callback,
    filepath: moduleFilepath,
} = await days.getDay(day, part);
const resolvedModulePath = path.resolve(moduleFilepath);

if (!requires) {
    throw new Error(`No resource entry point in "${resolvedModulePath}"`);
}

const resourceFilepath = path.resolve(`./src/resources/${requires}`);
const content = fs.readFileSync(resourceFilepath, {
    encoding: "utf-8",
});
const lines = content.split("\n").slice(0, -1);
const ctx = {
    args,
    content,
    day,
    lines,
};
let result = callback(ctx);

if (result === undefined) {
    if (!quiet) {
        console.error(`No result returned from ${resolvedModulePath}`);
    }

    process.exit(1);
}

if (!quiet) {
    console.log(result);
}

process.exit(0);
