document.addEventListener('DOMContentLoaded', () => {
  const playerInfoPage = document.querySelector('#player_info_page');
  const playerOInput = document.querySelector('#player_o');
  const playerXInput = document.querySelector('#player_x');
  const loginBtn = document.querySelector('#login_btn');

  const gamePage = document.querySelector('#game_page');
  const playerONameDisplay = document.querySelector('#player_o_name');
  const playerXNameDisplay = document.querySelector('#player_x_name');
  const gameContainer = document.querySelector('#game');

  let currentPlayer = 'O';
  let board = Array(9).fill(null);

  function Player(name) {
    this.name = name;
  }

  const switchPlayer = () => {
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]      
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes(null) ? null : 'Draw';
  };

  const resetGame = () => {
    board.fill(null);
    currentPlayer = 'O';
    renderBoard();
  };

  const renderBoard = () => {
    gameContainer.innerHTML = '';

    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.addEventListener('click', resetGame);

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.addEventListener('click', resetGame);

    gameContainer.appendChild(startButton);
    gameContainer.appendChild(resetButton);

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board');
    gameContainer.appendChild(boardContainer);

    board.forEach((cell, index) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.textContent = cell || '';
      cellDiv.addEventListener('click', () => handleMove(index));
      boardContainer.appendChild(cellDiv);
    });
  };

  const handleMove = (index) => {
    if (board[index] || checkWinner()) return;
    board[index] = currentPlayer;
    const winner = checkWinner();
    if (winner) {
      alert(winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} Wins!`);
    } else {
      switchPlayer();
    }
    renderBoard();
  };

  loginBtn.addEventListener('click', () => {
    const playerONameValue = playerOInput.value.trim() || 'Player O';
    const playerXNameValue = playerXInput.value.trim() || 'Player X';

    const playerO = new Player(playerONameValue);
    const playerX = new Player(playerXNameValue);

    playerONameDisplay.textContent = `Player O: ${playerO.name}`;
    playerXNameDisplay.textContent = `Player X: ${playerX.name}`;

    playerInfoPage.style.display = 'none';
    gamePage.style.display = 'block';

    renderBoard();
  });
});