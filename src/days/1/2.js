/*

    Problem: https://adventofcode.com/2022/day/1#part2

    Output: The sum of the top 3 highest calories

*/
export const requires = "calories.txt";

export default function getTop3HighestCalories(ctx) {
    const elves = [];
    const allElvesTotalCalories = [];
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
        let totalCalories = elfCalories.reduce(
            (totalCalories, calories) => totalCalories + calories
        );

        allElvesTotalCalories.push(totalCalories);
    }

    const [first, second, third] = allElvesTotalCalories.sort((a, b) => {
        if (a > b) {
            return -1;
        } else if (a < b) {
            return 1;
        }

        return 0;
    });
    const top3HighestCaloriesSum = first + second + third;

    return top3HighestCaloriesSum;
}
