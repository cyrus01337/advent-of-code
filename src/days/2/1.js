/*
    Problem: https://adventofcode.com/2022/day/2

    The encrypted strategy guide for RPS contains 2 columns

    The 1st column is what the opponent will play, where:

    A = Rock
    B = Paper
    C = Scissors

    The 2nd column is what the player will play, replacing
    the identifiers with X, Y and Z respectively. Score is
    calculated based on the letter's position + the
    outcome, where the outcome is represented as:

    A loss = 0
    A draw = 3
    A win = 6

    ...and your letter's position, determined by the
    player's voice, are tallied like so:

    A = Rock = 1
    B = Paper = 2
    C = Scissors = 3

    The same applies with the replaced identifiers for the
    player's options.

    Calculate every score for every match and return the
    total score
*/
import rps from "./rps.js";

export const requires = "encrypted-strategy-guide.txt";

const CHOICE_SCORE_RESOLVER = {
    rock: 1,
    paper: 2,
    scissors: 3,
};

const resolveChoice = choice => {
    switch (choice) {
        case "A":
        case "X":
            return "rock";
        case "B":
        case "Y":
            return "paper";
        case "C":
        case "Z":
            return "scissors";
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
        const [unresolvedEnemyChoice, unresolvedPlayerChoice] =
            unparsedChoices.split(" ");
        const enemyChoice = resolveChoice(unresolvedEnemyChoice);
        const playerChoice = resolveChoice(unresolvedPlayerChoice);
        const scoreFromChoice = CHOICE_SCORE_RESOLVER[playerChoice];
        const [playerWins, enemyWins] = rps(playerChoice, enemyChoice);
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
