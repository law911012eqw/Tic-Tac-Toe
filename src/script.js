'use strict'
const DOM = (() => {
    const tttScreen = document.getElementById('ttt-screen');
    const selectOpponent = document.querySelectorAll('.selectOpp');
    const selectOppCont = document.getElementById('choose-opponent-container');
    const selectTurn = document.querySelectorAll('.select-move');
    const mainHeader = document.getElementById('main-header');
    const mainSect = document.getElementById('main-section');
    const x = document.getElementById('x');
    const o = document.getElementById('o')
    const playerTurn = document.getElementById('player-turn');
    const playerName = document.getElementById('player-name');
    const oppTurn = document.getElementById('op-turn');
    const oppName = document.getElementById('op-name');
    const playerWins = document.getElementById('player-score');
    const oppWins = document.getElementById('op-score')
    return {
        tttScreen,
        selectOpponent,
        selectOppCont,
        selectTurn,
        mainHeader,
        mainSect,
        x,
        playerTurn,
        playerName,
        oppName,
        oppTurn,
    }
})();

const player = (name) => {
    let totalWins = 0;
    let ttt = "x"; //first move or 2nd move
    let opponent; //either 2nd player or AI
    const setOp = (value) => opponent = value; //setters
    const setWin = (v) => totalWins += v;
    const setPlayerTurn = (turn) => ttt = turn;
    const getTotalWins = () => totalWins;
    const getName = () => name; //getters
    const getTTT = () => ttt;
    const getOpponent = () => opponent;
    const debugFunc = () => {
        console.log(ttt);
        console.log(opponent);
        console.log(getTotalWins());
        console.log(getOpponent());
    }
    return {
        totalWins,
        ttt,
        opponent,
        debugFunc,
        setWin,
        setOp,
        setPlayerTurn,
        getName,
        getTTT,
        getOpponent,
        getTotalWins
    }
}
const gameBoard = (() => {
    let index = 0;
    const setIndex = (v) => index += v;
    const getIndex = () => index;
    const resetIndex = () => index = 0;
    const board = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
    const winCon = () => {
        if ((board[0] == Player.getTTT() && board[1] == Player.getTTT() && board[2] == Player.getTTT()) ||
            (board[3] == Player.getTTT() && board[4] == Player.getTTT() && board[5] == Player.getTTT()) ||
            (board[6] == Player.getTTT() && board[7] == Player.getTTT() && board[8] == Player.getTTT()) ||
            (board[0] == Player.getTTT() && board[3] == Player.getTTT() && board[6] == Player.getTTT()) ||
            (board[1] == Player.getTTT() && board[4] == Player.getTTT() && board[7] == Player.getTTT()) ||
            (board[2] == Player.getTTT() && board[5] == Player.getTTT() && board[8] == Player.getTTT()) ||
            (board[0] == Player.getTTT() && board[4] == Player.getTTT() && board[8] == Player.getTTT()) ||
            (board[2] == Player.getTTT() && board[4] == Player.getTTT() && board[6] == Player.getTTT())) {
            clearBoard();
            return true;
        }
        else if ((board[0] == `${Player.getOpponent()}`.getTTT() && board[1] == `${Player.getOpponent()}`.getTTT() && board[2] == `${Player.getOpponent()}`.getTTT()) ||
            (board[3] == `${Player.getOpponent()}`.getTTT() && board[4] == `${Player.getOpponent()}`.getTTT() && board[5] == `${Player.getOpponent()}`.getTTT()) ||
            (board[6] == `${Player.getOpponent()}`.getTTT() && board[7] == `${Player.getOpponent()}`.getTTT() && board[8] == `${Player.getOpponent()}`.getTTT()) ||
            (board[0] == `${Player.getOpponent()}`.getTTT() && board[3] == `${Player.getOpponent()}`.getTTT() && board[6] == `${Player.getOpponent()}`.getTTT()) ||
            (board[1] == `${Player.getOpponent()}`.getTTT() && board[4] == `${Player.getOpponent()}`.getTTT() && board[7] == `${Player.getOpponent()}`.getTTT()) ||
            (board[2] == `${Player.getOpponent()}`.getTTT() && board[5] == `${Player.getOpponent()}`.getTTT() && board[8] == `${Player.getOpponent()}`.getTTT()) ||
            (board[0] == `${Player.getOpponent()}`.getTTT() && board[4] == `${Player.getOpponent()}`.getTTT() && board[8] == `${Player.getOpponent()}`.getTTT()) ||
            (board[2] == `${Player.getOpponent()}`.getTTT() && board[4] == `${Player.getOpponent()}`.getTTT() && board[6] == `${Player.getOpponent()}`.getTTT())) {
            clearBoard();
            return false;
        }
    }
    //const 
    const tiles = document.querySelectorAll('.tiles');
    const clearBoard = () => {
        tiles.forEach((x) => {
            x.textContent = "";
        })
    }
    return {
        index,tiles,
        getIndex,setIndex,
        winCon,resetIndex,
        clearBoard,
    }
})();

function isEven(n) {
    return n % 2 == 0;
}

function startTTT(){
    DOM.tttScreen.setAttribute('style', 'display: initial');
    DOM.selectOppCont.setAttribute('style', 'visibility: hidden');
}
function chooseOpponentScreen(){
    DOM.tttScreen.setAttribute('style', 'display: none');
    DOM.selectOppCont.setAttribute('style', 'visibility: visible');
}
function displayPlayerTurn(){
    DOM.playerTurn.textContent = 'Your turn';
    DOM.oppTurn.textContent = 'Next turn';
}
function displayPlayer2Turn(){
    DOM.playerTurn.textContent = 'Next turn';
    DOM.oppTurn.textContent = 'Your turn';
}
//factory function declared as a variable
const Player = player('Player1');
const Player2 = player('Player2');
const AI = player('Unbeatable A.I');
const tiles = gameBoard.tiles;

//tic-tac-toe game main functionality 
for (const tile of gameBoard.tiles) {
    tile.addEventListener('click', function (e) {
        Player.debugFunc();
        if (e.target.textContent === "" && Player.getOpponent() === 'Player') {
            if (isEven(gameBoard.getIndex())) {
                e.target.textContent = 'x'
                Player.getTTT() === 'x' ? displayPlayer2Turn() : displayPlayerTurn();
            }
            else {
                e.target.textContent = 'o';
                Player.getTTT() === 'x' ? displayPlayerTurn() : displayPlayer2Turn();
            }
            gameBoard.setIndex(1);
            console.log(gameBoard.getIndex());
        }
    })
};

if (gameBoard.winCon === true) {
    Player.setWin(1);
    DOM.playerScore.textContent = Player.getTotalWins();
}
//the player may choose to go first or second while in-game or not 
//if it is in-game the board clears
for (const el of DOM.selectTurn) {
    el.addEventListener('click', function (e) {
        gameBoard.tiles.forEach(e => e.textContent = "");
        gameBoard.resetIndex();
        if (e.target.id === 'x') {
            Player.setPlayerTurn('x');
            Player2.setPlayerTurn('o');
            AI.setPlayerTurn('o');
            Player.debugFunc();
            DOM.playerTurn.textContent = 'Your turn';
            DOM.oppTurn.textContent = 'Next turn';
        }
        else if (e.target.id === 'o') {
            Player.setPlayerTurn('o');
            Player2.setPlayerTurn('x');
            AI.setPlayerTurn('x');
            DOM.playerTurn.textContent = 'Next turn';
            DOM.oppTurn.textContent = 'Your turn';
        }
    });
}

//website start - choose your opponent
for (const el of DOM.selectOpponent) {
    el.addEventListener('click', (e) => {
        e.target.id === 'playerOpp' || e.target.id === 'iconPlayer'
        ?  (Player.setOp('Player'), DOM.oppName.textContent = "Player2")
        :  (Player.setOp('AI'), DOM.oppName.textContent = "The Unbeatable A.I");     
        startTTT();
    });
}

document.getElementById('choose-opponent-btn').onclick = () => {
    chooseOpponentScreen();
}