'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const score = document.querySelector('.game-score');

document.getElementById('start-button').onclick = () => {
  game.start();
  updateTable(game.getState());
  document.getElementById('start-button').classList.add('hidden');
  document.getElementById('restart-button').classList.remove('hidden');
  document.querySelector('.message-start').classList.add('hidden');
};

document.getElementById('restart-button').onclick = () => {
  game.restart();
  updateTable(game.getState());
  score.innerText = game.getScore();
  document.getElementById('start-button').classList.remove('hidden');
  document.getElementById('restart-button').classList.add('hidden');
  document.querySelector('.message-start').classList.add('hidden');
  document.querySelector('.message-win').classList.add('hidden');
  document.querySelector('.message-lose').classList.add('hidden');
};

const table = document.querySelector('.game-field');

function updateTable(state) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (state[i][j] === 0) {
        table.rows[i].cells[j].className = 'field-cell';
        table.rows[i].cells[j].innerText = '';
      } else {
        table.rows[i].cells[j].className
        = `field-cell field-cell--${state[i][j]}`;
        table.rows[i].cells[j].innerText = state[i][j];
      }
    }
  }
}

function winOrLoseCheck() {
  if (game.getState() === 'win') {
    document.querySelector('.message-win').classList.remove('hidden');
  }

  if (game.getState() === 'lose') {
    document.querySelector('.message-lose').classList.remove('hidden');
  }
}

document.addEventListener('keydown', (e) => {
  if (game.getStatus() === 'playing') {
    switch (e.key) {
      case 'a':
      case 'ArrowLeft':
        game.moveLeft();
        winOrLoseCheck();
        break;
      case 'd':
      case 'ArrowRight':
        game.moveRight();
        winOrLoseCheck();
        break;
      case 'w':
      case 'ArrowUp':
        game.moveUp();
        winOrLoseCheck();
        break;
      case 's':
      case 'ArrowDown':
        game.moveDown();
        winOrLoseCheck();
        break;
      default:
        break;
    }

    updateTable(game.getState());
    score.innerText = game.getScore();
  }
});

document.addEventListener('gameLost', () => {
  document.querySelector('.message-lose').classList.remove('hidden');
});

document.addEventListener('gameWin', () => {
  document.querySelector('.message-win').classList.remove('hidden');
});
