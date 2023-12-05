const message = document.querySelector('.turnMessage');
message.textContent = `Player One's turn`;

const GameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows*columns; i++) {
        board[i] = " ";
    }

    const getBoard = () => board;
    let gameOver = false;

    const players = [
        {
            name: `Player One`,
            token: `X`
        },
        {
            name: `Player Two`,
            token: `O`
        }
    ];

    let activePlayer = players[1];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[1] ? players[0] : players[1];
        return activePlayer;
    }

    const printBoard = () => {
        console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
        console.log(`----------`);
        console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
        console.log(`----------`);
        console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
    }

    return { getBoard, printBoard, switchPlayer, activePlayer, players, gameOver}
}

const board = GameBoard();
const conditions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const makeMove = (cellNumber) => {
    if (!board.gameOver && cellNumber >= 0 && cellNumber <= 8 && board.getBoard()[cellNumber] === " ") {
        const currentPlayerToken = board.switchPlayer();
        board.getBoard()[cellNumber] = currentPlayerToken.token;
        
        if(currentPlayerToken.token === "X") {
            message.textContent = `${board.players[1].name}'s Turn`
        } else {
            message.textContent = `${board.players[0].name}'s Turn`
        }
    } else {
        console.log(`Invalid move, Please choose a valid cell`);
    }
    const result = checkWinner();

    if(result) {
        board.gameOver = true;
        if(result === `Tie!`) {
            return message.textContent = `It's a Tie!`;
        } else {
            console.log(`${result} wins!`);
            return message.textContent = `${result} Win's!!!`
        }
    };
    board.printBoard();
}

const checkWinner = () => {
    const boardArray = board.getBoard();

    for (const condition of conditions) {
        const [a, b , c] = condition;
        const cell = boardArray[a];
        if (
            boardArray[a] !== " " &&
            boardArray[a] === boardArray[b] &&
            boardArray[b] === boardArray[c]
        ) {
            return boardArray[a];
        }   
    }
    if(boardArray.every(cell => cell !== " ")) {
        return `Tie!`;
    }
    return null;
}

const displayGameBoard = document.querySelector('#gameBoard');
const createCells = () => {
    for(let i =0; i < board.getBoard().length; i++) {
        let cells = document.createElement('div');
        cells.classList.add(`${i}`);
        cells.style.background = "#ecebf3";
        cells.style.width = "100px";
        cells.style.height = "100px";
        cells.style.color = ""
        displayGameBoard.appendChild(cells);

        cells.addEventListener('click', () => {
            makeMove(i);
            cells.textContent = board.getBoard()[i];
        })
    }

}

const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    resetGame();
});

const resetGame = () => {
    window.location.reload();
}

createCells();

