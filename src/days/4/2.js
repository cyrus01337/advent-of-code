/*

    Problem: https://adventofcode.com/2022/day/4#part2

    Instead of checking if 1 range is within the other and
    vice versa, the idea is to check for overlaps - if a
    section within a range of sections is within the other
    range, it is considered overlapping.

    Log all pairs that overlap and return the times they
    were logged.

*/
export const requires = "pair-section-assignments.txt";

const parsePairs = line =>
    line
        .split(",")
        .map(pair => pair.split("-").map(number => parseInt(number)));

export default function countPairOverlaps(ctx) {
    let overlaps = 0;

    for (const line of ctx.lines) {
        const [firstPair, secondPair] = parsePairs(line);

        if (
            (firstPair[0] >= secondPair[0] && firstPair[0] <= secondPair[1]) ||
            (firstPair[1] >= secondPair[0] && firstPair[1] <= secondPair[1]) ||
            (secondPair[0] >= firstPair[0] && secondPair[0] <= firstPair[1]) ||
            (secondPair[1] >= firstPair[0] && secondPair[1] <= firstPair[1])
        ) {
            overlaps += 1;
        }
    }

    return overlaps;
}
