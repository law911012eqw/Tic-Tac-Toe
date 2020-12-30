'use strict'
const DOM = (() => {
    const tttScreen = document.getElementById('ttt-screen');
    const selectOpponent = document.querySelectorAll('.selectOpp');
    const selectOppCont = document.getElementById('choose-opponent-container');
    const selectTurn = document.querySelectorAll('.select-move');
    const playerTurn = document.getElementById('player-turn');
    const playerName = document.getElementById('player-name');
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
        playerName,
        oppName,
        oppTurn,
        leftArrow,
        rightArrow,
        displayModal,
        displayText,
    }
})();

const player = () => {
    let ttt; //first move or 2nd move
    let opponent; //either 2nd player or AI
    const setOp = (value) => opponent = value; //setters
    const setPlayerTurn = (turn) => ttt = turn;
    const getName = () => player.caller.name; //getters
    const getTTT = () => ttt;
    const getOpponent = () => opponent;
    const debugFunc = () => {
        console.log(opponent);
        console.log(getOpponent());
        console.log(getTTT());
    }
    return {
        debugFunc,
        setOp,
        setPlayerTurn,
        getName,
        getTTT,
        getOpponent,
    }
}
const gameBoard = (() => {
    let index = 0;
    let board = ['', '', '', '', '', '', '', '', ''];
    const setIndex = (v) => index += v;
    const getIndex = () => index;
    const resetIndex = () => index = 0; //resets the current index
    const resetBoard = () => board.forEach((x, i, arr) => arr[i] = ''); //reset to default board
    const getBoard = (i) => board[i];//get board element based on array index
    const getBoardArr = () => board; //get the board array
    const setTile = (v, i) => board[i] = v; //set board value by array index
    const winCon = () => {
        if ((getBoard(0) == Player.getTTT() && getBoard(1) == Player.getTTT() && getBoard(2) == Player.getTTT()) ||
            (getBoard(3) == Player.getTTT() && getBoard(4) == Player.getTTT() && getBoard(5) == Player.getTTT()) ||
            (getBoard(6) == Player.getTTT() && getBoard(7) == Player.getTTT() && getBoard(8) == Player.getTTT()) ||
            (getBoard(0) == Player.getTTT() && getBoard(3) == Player.getTTT() && getBoard(6) == Player.getTTT()) ||
            (getBoard(1) == Player.getTTT() && getBoard(4) == Player.getTTT() && getBoard(7) == Player.getTTT()) ||
            (getBoard(2) == Player.getTTT() && getBoard(5) == Player.getTTT() && getBoard(8) == Player.getTTT()) ||
            (getBoard(0) == Player.getTTT() && getBoard(4) == Player.getTTT() && getBoard(8) == Player.getTTT()) ||
            (getBoard(2) == Player.getTTT() && getBoard(4) == Player.getTTT() && getBoard(6) == Player.getTTT())) {
            return true;
        }
        else if ((getBoard(0) == Player2.getTTT() && getBoard(1) == Player2.getTTT() && getBoard(2) == Player2.getTTT()) ||
            (getBoard(3) == Player2.getTTT() && getBoard(4) == Player2.getTTT() && getBoard(5) == Player2.getTTT()) ||
            (getBoard(6) == Player2.getTTT() && getBoard(7) == Player2.getTTT() && getBoard(8) == Player2.getTTT()) ||
            (getBoard(0) == Player2.getTTT() && getBoard(3) == Player2.getTTT() && getBoard(6) == Player2.getTTT()) ||
            (getBoard(1) == Player2.getTTT() && getBoard(4) == Player2.getTTT() && getBoard(7) == Player2.getTTT()) ||
            (getBoard(2) == Player2.getTTT() && getBoard(5) == Player2.getTTT() && getBoard(8) == Player2.getTTT()) ||
            (getBoard(0) == Player2.getTTT() && getBoard(4) == Player2.getTTT() && getBoard(8) == Player2.getTTT()) ||
            (getBoard(2) == Player2.getTTT() && getBoard(4) == Player2.getTTT() && getBoard(6) == Player2.getTTT()) ||
            (getBoard(0) == AI.getTTT() && getBoard(1) == AI.getTTT() && getBoard(2) == AI.getTTT()) ||
            (getBoard(3) == AI.getTTT() && getBoard(4) == AI.getTTT() && getBoard(5) == AI.getTTT()) ||
            (getBoard(6) == AI.getTTT() && getBoard(7) == AI.getTTT() && getBoard(8) == AI.getTTT()) ||
            (getBoard(0) == AI.getTTT() && getBoard(3) == AI.getTTT() && getBoard(6) == AI.getTTT()) ||
            (getBoard(1) == AI.getTTT() && getBoard(4) == AI.getTTT() && getBoard(7) == AI.getTTT()) ||
            (getBoard(2) == AI.getTTT() && getBoard(5) == AI.getTTT() && getBoard(8) == AI.getTTT()) ||
            (getBoard(0) == AI.getTTT() && getBoard(4) == AI.getTTT() && getBoard(8) == AI.getTTT()) ||
            (getBoard(2) == AI.getTTT() && getBoard(4) == AI.getTTT() && getBoard(6) == AI.getTTT())) {
            return false;
        }
    }
    //const 
    const tiles = document.querySelectorAll('.tiles');
    const clearBoard = () => {
        tiles.forEach((x) => x.textContent = "");
        resetBoard();
    }
    return {
        index, tiles,
        getIndex, setIndex,
        winCon, resetIndex,
        clearBoard, setTile,
        getBoard, resetBoard,
        getBoardArr,
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
        if (gameBoard.winCon()) {
            console.log('I WIN')
            DOM.displayModal.style.display = 'initial';
            DOM.displayText.textContent = 'Player1 wins!!'
        }
        else if (gameBoard.winCon() === false) {
            DOM.displayModal.style.display = 'initial';
            DOM.displayText.textContent = `${Player.getOpponent()} wins!!`;
            DOM.displayText.textContent = `${Player.getOpponent()} wins!!`;
            DOM.displayText.textContent = `${Player.getOpponent()} wins!!`;
        }
        else if (gameBoard.getBoardArr().every(x => x === "x" || x === "o")) {
            DOM.displayModal.style.display = 'initial';
            DOM.displayText.textContent = 'It\'s a Tie!!';
        }
    }

    //website start - choose your opponent
    for (const el of DOM.selectOpponent) {
        el.addEventListener('click', (e) => {
            e.target.id === 'playerOpp' || e.target.id === 'iconPlayer'
                ? (Player.setOp('Player2'), DOM.oppName.textContent = "Player2", Player.setPlayerTurn('x'),
                    Player2.setPlayerTurn('o'))
                : (Player.setOp('AI'), DOM.oppName.textContent = "The Unbeatable A.I"
                    , Player.setPlayerTurn('x'), AI.setPlayerTurn('o'));
            startTTT();
            gameBoard.resetIndex();
            gameBoard.clearBoard();
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
    }
    return {
        startTTT,
        chooseOpponentScreen,
        displayPlayerTurn,
        displayPlayer2Turn,
        determineWinner,
    }
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
                    gameBoard.setTile('x', i);
                    Player.getTTT() === 'x' ? displayController.displayPlayer2Turn()
                        : displayController.displayPlayerTurn();
                }
                else {
                    e.target.textContent = 'o';
                    gameBoard.setTile('o', i);
                    Player.getTTT() === 'x' ? displayController.displayPlayerTurn()
                        : displayController.displayPlayer2Turn();
                }
                gameBoard.setIndex(1);
            }
            else if (e.target.textContent === "" && Player.getOpponent() === 'AI') {
                Player.getTTT() === 'x' //activates if first move
                    ? (e.target.textContent = 'x',
                        displayController.displayPlayer2Turn(),
                        gameBoard.setTile('x', i))
                    : (e.target.textContent = 'o',
                        displayController.displayPlayerTurn(),
                        gameBoard.setTile('o', i));
                let moveIndex = findBestMove();
                AI.getTTT() === 'x'
                    ? (arr[moveIndex].textContent = 'x', gameBoard.setTile('x', moveIndex))
                    : (arr[moveIndex].textContent = 'o', gameBoard.setTile('o', moveIndex));
                console.log(gameBoard.getBoardArr());
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
            }
        });
    }
})()

