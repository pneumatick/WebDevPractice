const cardSlots = document.getElementsByClassName("card-slot");
const cards = document.getElementsByClassName("card");
const scoreCounter = document.getElementById("score");
const lossCounter = document.getElementById("losses");
const defaultBackgroundColor = "#008080";
let flippedCards = [];
let score = 0;
let losses = 0;

function mouseOverColor(event) {
    event.target.style.backgroundColor = "#008999";
}

function mouseOutColor(event) {
    event.target.style.backgroundColor = defaultBackgroundColor;
}

function processFlip(event) {
    // Reveal card
    let card = event.target.querySelector(".card");
    if (card) {
        card.style.visibility = "visible";
        event.target.style.backgroundColor = "white";
        event.target.removeEventListener("mouseover", mouseOverColor);
        event.target.removeEventListener("mouseout", mouseOutColor);

        // Determine the game state after this card flip
        determineGameState(card);
    }
}

function determineGameState(card) {
    let flippedMod = flippedCards.length % 2;
    let image = card.src;

    // Won
    // Pushing occurs after this, so the length should be
    // 5 rather than 6 for a win
    if (flippedCards.length === 5) {
        roundWon();
    }
    // Revealed first of the set
    else if (flippedMod === 0) {
        flippedCards.push(image);
    }
    else {
        // Revealed second of the set
        if (flippedCards.includes(image)) {
            flippedCards.push(image);
        }
        // Lost
        else {
            roundLost();
        }
    }
}

function roundWon() {
    alert("You won!");
    setNewRound();
    score++;
    scoreCounter.innerHTML = `Score: ${score}`;
}

function roundLost() {
    alert("You lost!");
    setNewRound();
    losses++;
    lossCounter.innerHTML = `Failed Attempts: ${losses}`;
}

function setNewRound() {
    for (let slot of cardSlots) {
        slot.style.backgroundColor = defaultBackgroundColor;
        slot.addEventListener("mouseover", mouseOverColor);
        slot.addEventListener("mouseout", mouseOutColor);
    }

    for (let card of cards) {
        card.style.visibility = "hidden";
    }

    flippedCards = [];
}

for (let slot of cardSlots) {
    slot.addEventListener("mouseover", mouseOverColor);
    slot.addEventListener("mouseout", mouseOutColor);
    slot.addEventListener("click", processFlip);
}