const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const statusDisplay = document.getElementById('status');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
    updateStatus();
}

function handleCellClick(index) {
    if (gameState[index] !== '' || !gameActive) return;
    gameState[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].innerText = currentPlayer;
    checkResult();
}

function checkResult() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            updateStatus(`${currentPlayer} wins! 🎉`);
            gameActive = false;
            return;
        }
    }

    if (!gameState.includes('')) {
        updateStatus('It\'s a draw! 🤝');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function updateStatus(message = `${currentPlayer}'s turn`) {
    statusDisplay.innerText = message;
}

resetButton.addEventListener('click', () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    updateStatus();
});

createBoard();
