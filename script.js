"use strict";
let diceRoll;
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const p1 = document.querySelector(".player--0");
const p2 = document.querySelector(".player--1");
const p1Current = p1.querySelector("#current--0"); // have to use querySelector if looking from parent
const p1Score = p1.querySelector("#score--0");
const p2Current = p2.querySelector("#current--1");
const p2Score = p2.querySelector("#score--1");
const dice = document.querySelector(".dice");

dice.classList.add("hidden");
p1Score.textContent = 0;
p2Score.textContent = 0;

rollBtn.addEventListener("click", () => {
    diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${diceRoll}.png`;
    dice.classList.remove("hidden");
    let activePlayer = p1.classList.contains("player--active") ? p1 : p2;
    let inactivePlayer = p1.classList.contains("player--active") ? p2 : p1;
    if (diceRoll === 1) {
        activePlayer.querySelector(".current-score").textContent = 0;
        activePlayer.classList.remove("player--active");
        inactivePlayer.classList.add("player--active");
    } else {
        activePlayer.querySelector(".current-score").textContent =
            Number(activePlayer.querySelector(".current-score").textContent) +
            diceRoll;
    }
});

holdBtn.addEventListener("click", () => {
    let activePlayer = p1.classList.contains("player--active") ? p1 : p2;
    let inactivePlayer = p1.classList.contains("player--active") ? p2 : p1;
    activePlayer.querySelector(".score").textContent =
        Number(activePlayer.querySelector(".score").textContent) +
        Number(activePlayer.querySelector(".current-score").textContent);

    if (Number(activePlayer.querySelector(".score").textContent) >= 100) {
        activePlayer.classList.add("player--winner");
        dice.classList.add("hidden");
        rollBtn.disabled = true;
        holdBtn.disabled = true;
    } else {
        activePlayer.querySelector(".current-score").textContent = 0;
        activePlayer.classList.remove("player--active");
        inactivePlayer.classList.add("player--active");
    }
});

newBtn.addEventListener("click", () => {
    p1.classList.add("player--active");
    p2.classList.remove("player--active");
    p1.classList.remove("player--winner");
    p2.classList.remove("player--winner");
    p1Current.textContent = 0;
    p1Score.textContent = 0;
    p2Current.textContent = 0;
    p2Score.textContent = 0;
    dice.classList.add("hidden");
    rollBtn.disabled = false;
    holdBtn.disabled = false;
});
