'use strict'
const DOM = (() => {
    const tttScreen = document.getElementById('ttt-screen');
    const selectOpponent = document.querySelectorAll('.selectOpp');
    const selectOppCont = document.getElementById('choose-opponent-container');
    const selectTurn = document.querySelectorAll('.select-move');
    const mainHeader = document.getElementById('main-header');
    const mainSect = document.getElementById('main-section');
    const playerTurn = document.getElementById('player-turn');
    const playerName = document.getElementById('player-name');
    const oppTurn = document.getElementById('op-turn');
    const oppName = document.getElementById('op-name');
    const leftArrow = document.querySelector('.fa-arrow-left');
    const rightArrow = document.querySelector('.fa-arrow-right');
    const displayResult = document.getElementById('display-result');
    const displayText = document.getElementById('text-result');
    return {
        tttScreen,
        selectOpponent,
        selectOppCont,
        selectTurn,
        mainHeader,
        mainSect,
        playerTurn,
        playerName,
        oppName,
        oppTurn,
        leftArrow,
        rightArrow,
        displayResult,
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
    const setIndex = (v) => index += v;
    const getIndex = () => index;
    const resetIndex = () => index = 0;
    /*const board = [
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8']
    ];*/
    const board = [0,1,2,3,4,5,6,7,8];
    const resetBoard = () => board.forEach((x,i,arr) => arr[i] = i);
    const getBoard = (i) => board[i];
    const setTile = (v,i) => board[i] = v;
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
            (getBoard(2) == Player2.getTTT() && getBoard(4) == Player2.getTTT() && getBoard(6) == Player2.getTTT())) {
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
        index,tiles,
        getIndex,setIndex,
        winCon,resetIndex,
        clearBoard,setTile,
        getBoard, resetBoard,
    }
})();
//factory function declared as a variable
const Player = player();
const Player2 = player();
const AI = player();

function isEven(n) {
    return n % 2 == 0;
}
//screen transitions
function startTTT(){
    DOM.tttScreen.setAttribute('style', 'display: initial');
    DOM.selectOppCont.setAttribute('style', 'visibility: hidden');
}
function chooseOpponentScreen(){
    DOM.tttScreen.setAttribute('style', 'display: none');
    DOM.selectOppCont.setAttribute('style', 'visibility: visible');
}
//display both parties' turn
function displayPlayerTurn(){
    DOM.playerTurn.textContent = 'Your turn';
    DOM.oppTurn.textContent = 'Next turn';
    DOM.leftArrow.style.visibility = 'visible';
    DOM.rightArrow.style.visibility = 'hidden';
}
function displayPlayer2Turn(){
    DOM.playerTurn.textContent = 'Next turn';
    DOM.oppTurn.textContent = 'Your turn';
    DOM.leftArrow.style.visibility = 'hidden';
    DOM.rightArrow.style.visibility = 'visible';
}
function isequal(a, b, c) {
    return a == b && b == c && a != '';
  }
function determineWinner(){
    if (gameBoard.winCon()) {
        console.log('I WIN')
        DOM.displayResult.style.display = 'initial';
        DOM.displayText.textContent = 'Player1 wins!!'
    }
    else if (gameBoard.winCon() === false){
        DOM.displayResult.style.display = 'initial';
        DOM.displayText.textContent = `${Player.getOpponent()} wins!!`;  
    }
}

//tic-tac-toe game main functionality 
//replace with foreach later
gameBoard.tiles.forEach((tile,i) => {
    tile.addEventListener('click', function (e) {
        if (e.target.textContent === "" && Player.getOpponent() === 'Player2') {
            if (isEven(gameBoard.getIndex())) {
                e.target.textContent = 'x'
                gameBoard.setTile('x',i);
                Player.getTTT() === 'x' ? displayPlayer2Turn() : displayPlayerTurn();
            }
            else {
                e.target.textContent = 'o';
                gameBoard.setTile('o',i);
                Player.getTTT() === 'x' ? displayPlayerTurn() : displayPlayer2Turn();
            }
            gameBoard.setIndex(1);
            //console.log(gameBoard.getBoard(i));
            Player.debugFunc();
            Player2.debugFunc();
            determineWinner();
        }
    })
});

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
            displayPlayerTurn();
        }
        else if (e.target.id === 'o') {
            Player.setPlayerTurn('o');
            Player2.setPlayerTurn('x');
            AI.setPlayerTurn('x');
            displayPlayer2Turn();
        }
    });
}

//website start - choose your opponent
for (const el of DOM.selectOpponent) {
    el.addEventListener('click', (e) => {
        e.target.id === 'playerOpp' || e.target.id === 'iconPlayer'
        ?  (Player.setOp('Player2'), DOM.oppName.textContent = "Player2", Player.setPlayerTurn('x'),
        Player2.setPlayerTurn('o'))
        :  (Player.setOp('AI'), DOM.oppName.textContent = "The Unbeatable A.I");     
        startTTT();     
    });
}

//allows the user to return to the intro screen(choosing opponent)
document.getElementById('choose-opponent-btn').onclick = () => chooseOpponentScreen();

//
document.querySelector('#display-result > button').onclick = () => {
    DOM.displayResult.style.display = 'none';
    gameBoard.resetIndex();
    gameBoard.clearBoard();
}