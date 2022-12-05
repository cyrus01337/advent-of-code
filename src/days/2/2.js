/*
    Problem: https://adventofcode.com/2022/day/2#part2

    The second column now dictates how the match should end,
    so the player's choice now needs to be determined based
    on this outcome:

    X = Lose
    Y = Draw
    Z = Win

    If the opponent chooses rock and you need to draw, your
    choice also needs to be rock.

    If the opponent chooses rock and you need to lose, your
    choice needs to be whatever loses to rock.

    If the opponent chooses rock and you need to win, your
    choice needs to be whatever wins against rock.
*/
import rps from "./rps.js";

export const requires = "encrypted-strategy-guide.txt";

const CHOICE_SCORE_RESOLVER = {
    rock: 1,
    paper: 2,
    scissors: 3,
};
const OPTIONS = {
    winning: {
        rock: "paper",
        paper: "scissors",
        scissors: "rock",
    },
    losing: {
        rock: "scissors",
        paper: "rock",
        scissors: "paper",
    },
};

const resolveChoice = choice => {
    switch (choice) {
        case "A":
            return "rock";
        case "B":
            return "paper";
        case "C":
            return "scissors";
    }
};

const calculateExpectedChoice = (enemyChoice, outcome) => {
    switch (outcome) {
        case "X":
            return OPTIONS.losing[enemyChoice];
        case "Y":
            return enemyChoice;
        case "Z":
            return OPTIONS.winning[enemyChoice];
    }
};

export default function calculatePotentialStrategyGuideScore(ctx) {
    const choices = ctx.lines;
    let totalScore = 0;
    let matchScore = 0;
    let currentMatchIndex = 0;

    for (let choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) {
        const nextMatchIndex = Math.floor((choiceIndex + 1) / 3);
        const unparsedChoices = choices[choiceIndex];

        if (unparsedChoices === "") continue;

        const [unresolvedEnemyChoice, unresolvedOutcome] =
            unparsedChoices.split(" ");
        const enemyChoice = resolveChoice(unresolvedEnemyChoice);
        const determinedPlayerChoice = calculateExpectedChoice(
            enemyChoice,
            unresolvedOutcome
        );
        const scoreFromChoice = CHOICE_SCORE_RESOLVER[determinedPlayerChoice];
        const [playerWins, enemyWins] = rps(
            determinedPlayerChoice,
            enemyChoice
        );
        matchScore += scoreFromChoice;

        if (playerWins) {
            matchScore += 6;
        } else if (!(playerWins || enemyWins)) {
            matchScore += 3;
        }

        if (nextMatchIndex > currentMatchIndex) {
            totalScore += matchScore;
            matchScore = 0;
        }
    }

    return totalScore;
}
