/*

    Problem: https://adventofcode.com/2022/day/3#part2

    Create a group from 3 rucksacks, get the shared item from them
    and add the item priority to a total, return that instead

*/
export const requires = "rucksack-items.txt";

const ITEM_PRIORITIES = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const isSharedAcrossGroups = (item, groups) => {
    for (const group of groups) {
        if (!group.includes(item)) {
            return false;
        }
    }

    return true;
};

const getSharedItemInGroups = ([initialGroup, ...remainderGroups]) => {
    for (let i = 0; i < initialGroup.length; i++) {
        const item = initialGroup[i];

        if (isSharedAcrossGroups(item, remainderGroups)) {
            return item;
        }
    }
};

export default function getTotalRucksackItemPriorities(ctx) {
    let totalSharedItemPriority = 0;
    let rucksackGroup = [];

    for (const rucksack of ctx.lines) {
        rucksackGroup.push(rucksack);

        if (rucksackGroup.length < 3) {
            continue;
        }

        const sharedItem = getSharedItemInGroups(rucksackGroup);
        const sharedItemPriority = ITEM_PRIORITIES.indexOf(sharedItem) + 1;
        totalSharedItemPriority += sharedItemPriority;
        rucksackGroup = [];
    }

    return totalSharedItemPriority;
}
