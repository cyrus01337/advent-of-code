/*

    Problem: https://adventofcode.com/2022/day/3

    Every line in rucksack-items.txt is a rucksack, full of items
    When split into 2, find the 1 item shared between the sections
    Every item has a priority based on it's position in the
    alphabet, with capital letters equal to 26 + their position.

*/
export const requires = "rucksack-items.txt";

const ITEM_PRIORITIES = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getSharedItem = (leftCompartment, rightCompartment) => {
    for (let i = 0; i < leftCompartment.length; i++) {
        const leftItem = leftCompartment[i];

        if (rightCompartment.includes(leftItem)) {
            return leftItem;
        }
    }
};

export default function getTotalRucksackItemPriorities(ctx) {
    let totalItemPriority = 0;

    for (const rucksack of ctx.lines) {
        const leftCompartment = rucksack.slice(0, rucksack.length / 2);
        const rightCompartment = rucksack.slice(rucksack.length / 2);
        const sharedItem = getSharedItem(leftCompartment, rightCompartment);
        const sharedItemPriority = ITEM_PRIORITIES.indexOf(sharedItem) + 1;
        totalItemPriority += sharedItemPriority;
    }

    return totalItemPriority;
}
