'use strict'
//list of mutable DOM elements
const DOM = (() => {
    const tttScreen = document.getElementById('ttt-screen');
    const selectOpponent = document.querySelectorAll('.selectOpp');
    const selectOppCont = document.getElementById('choose-opponent-container');
    const selectTurn = document.querySelectorAll('.select-move');
    const playerTurn = document.getElementById('player-turn');
    const oppTurn = document.getElementById('op-turn');
    const oppName = document.getElementById('op-name');
    const leftArrow = document.querySelector('.fa-arrow-left');
    const rightArrow = document.querySelector('.fa-arrow-right');
    const displayModal = document.querySelector('.modal');
    const displayText = document.getElementById('text-result');
    return {
        tttScreen,
        selectOpponent,
        selectOppCont,
        selectTurn,
        playerTurn,
        oppName,
        oppTurn,
        leftArrow,
        rightArrow,
        displayModal,
        displayText,
    }
})();
//player factory function
const player = () => {
    let _ttt = 'none'; //first move or 2nd move
    let _opponent; //either 2nd player or AI
    const setOp = (value) => _opponent = value; //setters
    const setPlayerTurn = (turn) => _ttt = turn;
    const getTTT = () => _ttt;
    const getOpponent = () => _opponent;
    return {
        setOp,
        setPlayerTurn,
        getTTT,
        getOpponent,
    }
}

const gameBoard = (() => {
    let _index = 0;
    let _previousMove;
    let board = ['', '', '',
        '', '', '',
        '', '', ''];
    const setIndex = (v) => _index += v;
    const getIndex = () => _index;
    const resetIndex = () => _index = 0; //resets the current index
    //reset to default board
    const resetBoard = () => board.forEach((x, i, arr) => arr[i] = '');
    const isBoardEmpty = () => board.every(x => '');
    const isBoardFull = () => getBoardArr().every(x => x === "x" || x === "o");
    const getBoard = (i) => board[i];//get board element based on array index
    const getBoardArr = () => board; //get the board array
    const getPreviousMove = () => _previousMove;
    const setTile = (v, i) => board[i] = v; //set board value by array index
    const setPreviousMove = (v) => _previousMove = v;
    const confirmWinner = () => {
        let winner = 0;

        //checks the winning condition
        if (isEqual(getBoard(0), getBoard(1), getBoard(2)) || isEqual(getBoard(3), getBoard(4), getBoard(5)) ||
            isEqual(getBoard(6), getBoard(7), getBoard(8)) || isEqual(getBoard(0), getBoard(3), getBoard(6)) ||
            isEqual(getBoard(1), getBoard(4), getBoard(7)) || isEqual(getBoard(2), getBoard(5), getBoard(8)) ||
            isEqual(getBoard(0), getBoard(4), getBoard(8)) || isEqual(getBoard(2), getBoard(4), getBoard(6))) {
            getPreviousMove() == Player.getTTT()
                ? winner = Player.getTTT()
                : getPreviousMove() == Player2.getTTT()
                    ? winner = Player2.getTTT()
                    : winner = AI.getTTT();
        }
        return winner;
    }
    const twoOutOfThree = (a, b, c) => {
        return a == b && b == c && a != '';
    }
    const isEqual = (a, b, c) => {
        if (a !== '') {
            return a == b && b == c && c == a;
        }
    }

    //check if there's two out of three equals to control the next move of AI
    const minimaxResult = () => {
        let winner = null;
        if (twoOutOfThree(getBoard(0), getBoard(1), getBoard(2))) {
            winner = getBoard(0);
        }
        if (twoOutOfThree(getBoard(3), getBoard(4), getBoard(5))) {
            winner = getBoard(3);
        }
        if (twoOutOfThree(getBoard(6), getBoard(7), getBoard(8))) {
            winner = getBoard(6);
        }
        if (twoOutOfThree(getBoard(0), getBoard(3), getBoard(6))) {
            winner = getBoard(0);
        }
        if (twoOutOfThree(getBoard(1), getBoard(4), getBoard(7))) {
            winner = getBoard(1);
        }
        if (twoOutOfThree(getBoard(2), getBoard(5), getBoard(8))) {
            winner = getBoard(2);
        }
        if (twoOutOfThree(getBoard(0), getBoard(4), getBoard(8))) {
            winner = getBoard(0);
        }
        if (twoOutOfThree(getBoard(2), getBoard(4), getBoard(6))) {
            winner = getBoard(2);
        }
        if (isBoardFull() && winner == null) {
            return winner = 't';
        } else {
            return winner;
        }
    }
    const tiles = document.querySelectorAll('.tiles');
    const clearBoard = () => {
        tiles.forEach((x) => x.textContent = "");
        resetBoard();
    }
    return {
        tiles, getIndex, setIndex,
        confirmWinner, resetIndex,
        clearBoard, setTile,
        getBoard, resetBoard,
        getBoardArr, isBoardEmpty,
        isBoardFull, minimaxResult,
        setPreviousMove, getPreviousMove,
        twoOutOfThree, isEqual,
    }
})();

//display elements or display related (including event listeners) of this website
const displayController = (() => {

    //screen transitions
    const startTTT = () => {
        DOM.tttScreen.setAttribute('style', 'display: initial');
        DOM.selectOppCont.setAttribute('style', 'visibility: hidden');
    }

    const chooseOpponentScreen = () => {
        DOM.tttScreen.setAttribute('style', 'display: none');
        DOM.selectOppCont.setAttribute('style', 'visibility: visible');
    }

    //display both parties' turn
    const displayPlayerTurn = () => {
        DOM.playerTurn.textContent = 'Your turn';
        DOM.oppTurn.textContent = 'Next turn';
        DOM.leftArrow.style.visibility = 'visible';
        DOM.rightArrow.style.visibility = 'hidden';
    }

    const displayPlayer2Turn = () => {
        DOM.playerTurn.textContent = 'Next turn';
        DOM.oppTurn.textContent = 'Your turn';
        DOM.leftArrow.style.visibility = 'hidden';
        DOM.rightArrow.style.visibility = 'visible';
    }

    const determineWinner = () => {
        if (gameBoard.confirmWinner() == Player.getTTT()) {
            DOM.displayModal.style.display = 'initial';
            DOM.displayText.textContent = 'Player1 wins!!'
        }
        else if (gameBoard.confirmWinner() == Player2.getTTT() ||
            gameBoard.confirmWinner() == AI.getTTT()) {
            DOM.displayModal.style.display = 'initial';
            DOM.displayText.textContent = `${Player.getOpponent()} wins!!`;
        }
        else if (gameBoard.isBoardFull()) {
            DOM.displayModal.style.display = 'initial';
            DOM.displayText.textContent = 'It\'s a Tie!!';
        }
    }

    //website start - choose your opponent
    for (const el of DOM.selectOpponent) {
        el.addEventListener('click', (e) => {
            if (e.target.id === 'playerOpp' || e.target.id === 'iconPlayer') {
                Player.setOp('Player2');
                DOM.oppName.textContent = "Player2";
                Player.setPlayerTurn('x');
                Player2.setPlayerTurn('o');
                gameBoard.resetIndex();
                gameBoard.clearBoard();
            }
            else {
                Player.setOp('AI');
                DOM.oppName.textContent = "The Unbeatable A.I";
                Player.setPlayerTurn('o');
                AI.setPlayerTurn('x');
                gameBoard.resetIndex();
                gameBoard.clearBoard();
                comAI.AImove([...gameBoard.tiles]);
            }
            startTTT();
        });
    }
    //allows the user to return to the intro screen(choosing opponent)
    document.getElementById('choose-opponent-btn').onclick = () => chooseOpponentScreen();

    //displays the final result of the game 
    document.querySelector('#display-result > button').onclick = () => {
        DOM.displayModal.style.display = 'none';
        gameBoard.resetIndex();
        gameBoard.clearBoard();
        Player.getTTT() === 'x'
            ? displayPlayerTurn()
            : displayPlayer2Turn();
        console.log(Player.getOpponent());
        console.log(AI.getTTT());
        if (Player.getOpponent() == 'AI' && AI.getTTT() == 'x') {
            comAI.AImove([...gameBoard.tiles]);
            displayController.displayPlayerTurn();
        }
    }
    return {
        startTTT,
        chooseOpponentScreen,
        displayPlayerTurn,
        displayPlayer2Turn,
        determineWinner,
    }
})()
const comAI = (() => {
    const AImove = (arr) => {
        let moveIndex = findBestMove();
        //AI move
        arr[moveIndex].textContent = AI.getTTT();
        gameBoard.setPreviousMove(AI.getTTT());
        gameBoard.setTile(AI.getTTT(), moveIndex);
    }
    return { AImove };
})()

//factory function declared as a variable
const Player = player();
const Player2 = player();
const AI = player();

//main functionality of the tic-tac-toe game
(function () {
    function isEven(n) {
        return n % 2 == 0;
    }
    gameBoard.tiles.forEach((tile, i, arr) => {
        tile.addEventListener('click', function (e) {
            if (e.target.textContent === "" && Player.getOpponent() === 'Player2') {
                if (isEven(gameBoard.getIndex())) {
                    e.target.textContent = 'x';
                    gameBoard.setPreviousMove('x');
                    gameBoard.setTile('x', i);
                    Player.getTTT() === 'x' ? displayController.displayPlayer2Turn()
                        : displayController.displayPlayerTurn();
                }
                else {
                    e.target.textContent = 'o';
                    gameBoard.setPreviousMove('o');
                    gameBoard.setTile('o', i);
                    Player.getTTT() === 'x' ? displayController.displayPlayerTurn()
                        : displayController.displayPlayer2Turn();
                }
                gameBoard.setIndex(1);
            }
            else if (e.target.textContent === "" && Player.getOpponent() === 'AI') {
                e.target.textContent = Player.getTTT();
                if(Player.getTTT() === 'x') { displayController.displayPlayer2Turn(); }
                gameBoard.setTile(Player.getTTT(), i);
                gameBoard.setPreviousMove(Player.getTTT());
                /*prevents the hindrance of displaying the result
                and avoids producing an error within minimax by stopping 
                when the board is full already*/
                console.log(gameBoard.getBoardArr());
                if (!gameBoard.isBoardFull()) {
                    comAI.AImove(arr);
                }
            }
            displayController.determineWinner();
        });
    });

    //the player may choose to go first or second while in-game or beforestarting
    //if it is in-game the board gets cleared
    for (const el of DOM.selectTurn) {
        el.addEventListener('click', function (e) {
            gameBoard.tiles.forEach(e => e.textContent = "");
            gameBoard.resetIndex();
            if (e.target.id === 'x') {
                Player.setPlayerTurn('x');
                Player2.setPlayerTurn('o');
                AI.setPlayerTurn('o');
                displayController.displayPlayerTurn();
            }
            else if (e.target.id === 'o') {
                Player.setPlayerTurn('o');
                Player2.setPlayerTurn('x');
                AI.setPlayerTurn('x');
                displayController.displayPlayer2Turn();
                gameBoard.clearBoard();
                if (Player.getOpponent() == 'AI') {
                    comAI.AImove([...gameBoard.tiles]);
                    displayController.displayPlayerTurn();
                }
            }
        });
    }
})()