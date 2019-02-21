// PIG GAME

var scores, roundScore, activePlayer, dice, gamePlaying, dicePrevious;

init();

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    previousScore = 0;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0"
    document.getElementById("score-1").textContent = "0"

    document.getElementById("current-0").textContent = "0"
    document.getElementById("current-1").textContent = "0"

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
}

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {

        // 1. Random number
        // dice = Math.floor(Math.random() * 6) + 1;
        dice = Math.floor(Math.random() * (7 - 5)) + 5;
        console.log(dice);

        // 2. Display result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // 3. Update round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }

        // 4. Update round score if previous roll, and current roll are NOT both 6
        if (dice === 6 && dicePrevious === 6) {
            document.querySelector("#score-" + activePlayer).textContent = 0;
            // Keep line below to change player, delete to give another go to the poor guy who lost his score
            nextPlayer();
            dicePrevious = 0;
        }

        if (dice === 6) {
            dicePrevious = 6;
            dice = 0;
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        dicePrevious = 0;

        // Update UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("winner");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

// ADDITIONS
// 1. Player loses whole score if they roll two 6s in a row
// 2. Add an input field to set score limit
// 3. Add another dice for speedy games
// 4. Let the player choose if they play with 1 or 2 dice