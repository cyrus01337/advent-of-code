/*

    Problem: https://adventofcode.com/2022/day/1

    Resources: file, every new line has either a number of calories or a newline.
    Input: calories (number, float?)
    Process: For every number of calories, add it to a total and keep track of it in an array.

    When a newline is reached, stop counting. The previous total is cached in an array, then cleared and the process repeats.
    Output: The highest total calories

*/
export const requires = "calories.txt";

export default function getHighestCalories(ctx) {
    const elves = [];
    let highestCalories = 0;
    let elf = [];

    for (const line of ctx.lines) {
        const calories = parseInt(line);

        if (isNaN(calories)) {
            // add elf to registrar of elves so we can keep track of their calories
            // as a unit
            elves.push(elf);

            // reset the current reference to array with new reference, so as to
            // avoid making changes to the same elf
            // in elf speak, start keeping track of new elf
            elf = [];

            continue;
        }

        elf.push(calories);
    }

    for (const elfCalories of elves) {
        let totalCalories = 0;

        for (const calories of elfCalories) {
            totalCalories += calories;
        }

        if (totalCalories > highestCalories) {
            highestCalories = totalCalories;
        }
    }

    return highestCalories;
}
