// script.js
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.game-status');
const restartBtn = document.querySelector('.restart-btn');

let isXTurn = true;
let boardState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});
restartBtn.addEventListener('click', restartGame);

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = isXTurn ? 'X' : 'O';
  const cellIndex = Array.from(cells).indexOf(cell);

  // Mark cell
  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for win or draw
  if (checkWin(currentPlayer)) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
  } else if (boardState.every(cell => cell)) {
    statusText.textContent = `It's a Draw! 😅`;
  } else {
    isXTurn = !isXTurn;
    statusText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
  }
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
}

function restartGame() {
  boardState.fill(null);
  isXTurn = true;
  statusText.textContent = `Player X's turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
}
