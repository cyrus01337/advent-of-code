import process from "process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default yargs(hideBin(process.argv))
    .option("day", {
        alias: "d",
        demandOption: true,
        description: "The day to select",
        type: "number",
    })
    .option("part", {
        alias: "p",
        choices: [1, 2],
        default: 1,
        description: "The part to run",
        type: "number",
    })
    .option("quiet", {
        alias: "q",
        description: "Silence output",
        type: "boolean",
    });
