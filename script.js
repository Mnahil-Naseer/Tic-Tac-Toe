const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const currentPlayerElement = document.getElementById('currentPlayer');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (event) => {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameBoard[index] !== '' || !gameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerElement.textContent = currentPlayer;
};

const checkWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    alert(`Player ${currentPlayer} wins!`);
    updateScore();
    gameActive = false;
    return;
  }

  if (!gameBoard.includes('')) {
    alert('Draw!');
    gameActive = false;
    return;
  }
};

const updateScore = () => {
  if (currentPlayer === 'X') {
    scoreX++;
    scoreXElement.textContent = scoreX;
  } else {
    scoreO++;
    scoreOElement.textContent = scoreO;
  }
};

const handleStart = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  currentPlayerElement.textContent = currentPlayer;
};

const handleReset = () => {
  handleStart();
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleReset);
