"use strict";

let p1Score = 0;
let p2Score = 0;
let p1Total = 0;
let p2Total = 0;

let activePlayer = 1;
let newDice = 0;
let winFlag = false;

let player1_Card = document.querySelector(".player1");
let player2_Card = document.querySelector(".player2");

const p1_TotalLabel = document.querySelector(".player1-score");
const p2_TotalLabel = document.querySelector(".player2-score");

const p1_currentScoreLabel = document.querySelector(".player1-current-score");
const p2_currentScoreLabel = document.querySelector(".player2-current-score");

const p1Label = document.querySelector(".p1-label");
const p2Label = document.querySelector(".p2-label");

const dice = document.querySelectorAll(".dice");

document.querySelector(".roll-dice").addEventListener("click", rollDice);
document.querySelector(".new-game").addEventListener("click", newGame);
document.querySelector(".hold").addEventListener("click", hold);

function hold() {
  if (winFlag) return;
  if (newDice != 0 || newDice != 1) {
    //add to totalScore
    if (activePlayer == 1) {
      p1Total += p1Score;
      p1_TotalLabel.textContent = p1Total;
    } else {
      p2Total += p2Score;
      p2_TotalLabel.textContent = p2Total;
    }
  }
  changePlayer();
  checkWin();
}

function changePlayer() {
  if (activePlayer == 1) {
    activePlayer = 2;
    //
    p1Score = 0;
    p2Score = 0;
    p1_currentScoreLabel.textContent = 0;
    p2_currentScoreLabel.textContent = 0;
    player2_Card.style.backgroundColor = "rgba(255,255,255,0.65)";
    player1_Card.style.backgroundColor = "rgba(255,255,255,0.4)";
  } else {
    activePlayer = 1;
    //
    p1Score = 0;
    p2Score = 0;
    p1_currentScoreLabel.textContent = 0;
    p2_currentScoreLabel.textContent = 0;
    player2_Card.style.backgroundColor = "rgba(255,255,255,0.4)";
    player1_Card.style.backgroundColor = "rgba(255,255,255,0.65)";
  }
}

function newGame() {
  p1_currentScoreLabel.textContent = 0;
  p2_currentScoreLabel.textContent = 0;
  p1_TotalLabel.textContent = 0;
  p2_TotalLabel.textContent = 0;
  if (activePlayer == 2) changePlayer();
  p1Score = 0;
  p2Score = 0;
  p1Total = 0;
  p2Total = 0;
  winFlag = false;
  for (let i = 0; i < dice.length; i++) {
    dice[i].classList.add(`dice${i + 1}`);
  }

  p1Label.textContent = "PLAYER 1";
  p2Label.textContent = "PLAYER 2";
  p1Label.style.color = "#2f2f2f";
  p2Label.style.color = "#2f2f2f";

  p1_TotalLabel.style.color = "rgb(188,30,30)";
  p2_TotalLabel.style.color = "rgb(188,30,30)";
  player1_Card.style.backgroundColor = "rgba(255,255,255,0.65)";
  player2_Card.style.backgroundColor = "rgba(255,255,255,0.4)";
}

function rollDice() {
  if (winFlag) return;
  newDice = Math.round(Math.random() * 5 + 1);
  console.log(newDice);

  for (let i = 0; i < dice.length; i++) {
    if (i === newDice - 1) {
      dice[i].classList.remove(`dice${i + 1}`);
    } else {
      dice[i].classList.add(`dice${i + 1}`);
    }
  }

  if (newDice == 1) {
    changePlayer();
  } else {
    addScore(newDice);
  }
  checkWin();
}

function addScore(score) {
  if (activePlayer == 1) {
    p1Score += score;
    p1_currentScoreLabel.textContent = p1Score;
  } else {
    p2Score += score;
    p2_currentScoreLabel.textContent = p2Score;
  }
  checkWin();
}

function checkWin() {
  //
  if (p1Total >= 100) {
    // alert(`Player 1 has won ${p1Total}-${p2Total}!`);
    player1_Card.style.backgroundColor = "#2f2f2f";
    p1Label.style.color = "rgb(0,255,0)";
    p1Label.textContent = "PLAYER 1 WON!";
    p1_TotalLabel.style.color = "rgb(0,255,0)";
    winFlag = true;
    return;
  }

  if (p2Total >= 100) {
    // alert(`Player 2 has won ${p2Total}-${p1Total}!`);
    player2_Card.style.backgroundColor = "#2f2f2f";
    p2Label.style.color = "rgb(0,255,0)";
    p2Label.textContent = "PLAYER 2 WON!";
    p2_TotalLabel.style.color = "rgb(0,255,0)";
    winFlag = true;
    return;
  }
  winFlag = false;
}
