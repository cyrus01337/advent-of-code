/*

    Problem: https://adventofcode.com/2022/day/4

    Given 2 columns with x-y text, delimited by a comma
    The first column determines the sections that the
    first elf is assigned to, where 2-4 is 2, 3 and 4
    The second column determines the sections that the
    second elf is assigned to, following the same rule.

    If a section is contained by another, log it and
    return the number of logged sections.

*/
export const requires = "pair-section-assignments.txt";

const parsePairs = line =>
    line
        .split(",")
        .map(pair => pair.split("-").map(number => parseInt(number)));

export default function countPairIntersections(ctx) {
    let intersections = 0;

    for (const line of ctx.lines) {
        const [firstPair, secondPair] = parsePairs(line);

        if (
            (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) ||
            (firstPair[1] <= secondPair[1] && firstPair[0] >= secondPair[0])
        ) {
            intersections += 1;
        }
    }

    return intersections;
}
