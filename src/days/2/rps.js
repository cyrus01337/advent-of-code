const winningOptions = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
};

export default function rps(primary, secondary) {
    const winningOption = winningOptions[primary];
    let playerWins = false;
    let enemyWins = false;

    if (secondary === winningOption) {
        playerWins = true;
    } else if (primary !== secondary) {
        enemyWins = true;
    }

    return [playerWins, enemyWins];
}
