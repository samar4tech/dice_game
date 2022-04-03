'use strict';
//selecting elements
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore1 = document.getElementById('current--0');
let currentScore2 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

//function for resetting/starting condition
//starting condition
const initially = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // suppose active player is the first player initially
  playing = true;

  score1.textContent = '0';
  score2.textContent = '0';
  currentScore1.textContent = '0';
  currentScore2.textContent = '0';

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player1.classList.remove('player--active');

  dice.classList.add('hidden');

  player0.classList.add('player--active');
  document.querySelectorAll('.name')[0].style.setProperty('--display', 'block');
  document.querySelectorAll('.name')[1].style.setProperty('--display', 'none');
  document
    .querySelectorAll('.name')[0]
    .style.setProperty('--content', `'current player'`);
  document
    .querySelectorAll('.name')[1]
    .style.setProperty('--content', `'current player'`);
};
initially();

//function
function switching() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');

  document.querySelectorAll('.name')[0].style.setProperty('--display', 'none');
  document.querySelectorAll('.name')[1].style.setProperty('--display', 'none');

  document
    .querySelectorAll('.name')
    [activePlayer].style.setProperty('--display', 'block');
  // dice.classList.add('hidden');
}

//generate random number b/w 1 to 6 and display dice accordingly when button clicked

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    let rnd = Math.trunc(6 * Math.random()) + 1;

    //2.display dice
    dice.classList.remove('hidden');
    console.log(rnd);
    dice.src = `dice-${rnd}.png`;

    //3.check for rolled 1:if true switch to next player.

    if (rnd !== 1) {
      //add dice to the current score
      currentScore += rnd;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switching();
    }
  }
});

//holding the current score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1- add current score to the active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2-check if player's score is >=100 if yes finish the game
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');

      document
        .querySelectorAll('.name')
        [`${activePlayer}`].style.setProperty(
          '--content',
          `'Congo!! You Won🏆🎉🎉...'`
        );
      playing = false;
    }
    //3-else switch to the other player
    else {
      switching();
    }
  }
});
btnNew.addEventListener('click', initially);
