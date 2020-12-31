const possibilities = { x: 10, o: -10, t: 0};

function _minimax(board, depth, a, b, isMax) {
  let result = gameBoard.minimaxResult();
  if (result !== null) {
    return possibilities[result];
  }
  //if AI is first move it'll immediately choose the best move
  //which is the first tile
  if (gameBoard.isBoardEmpty()) {
    depth += 1;
    return Infinity;
  }

  if (isMax) {
    let bestScore = -Infinity;
    //iterate througout the entire gameboard tiles
    for (let i = 0; i < 9; i++) {
      //checks for available spots  
      if (gameBoard.getBoard(i) == '') {
        board[i] = AI.getTTT();
        bestScore = Math.max(bestScore, _minimax(board, depth + 1, a, b, false));
        board[i] = '';
        a = Math.max(a, bestScore);
        if (a > b) {
          break;
        }
      }
    }
    return bestScore;
  }
  else {
    let bestScore = Infinity;

    for (let i = 0; i < 9; i++) {
      if (gameBoard.getBoard(i) == '') {
        board[i] = Player.getTTT();
        bestScore = Math.min(bestScore, _minimax(board, depth + 1, a, b, true));
        board[i] = '';
        b = Math.min(b, bestScore);
        if (b < a) {
          break;
        }
      }
    }
    return bestScore;
  }
}

function findBestMove() {
  let bestScore = -Infinity;
  let moveIndex;
  let board = gameBoard.getBoardArr();
  let score;
  for (let i = 0; i < 9; i++) {
    if (gameBoard.getBoard(i) == '') {
      board[i] = AI.getTTT();
      if (Player.getTTT() == 'o'){
        score = _minimax(board, 0, -Infinity, Infinity, false);
      }
      else if (Player.getTTT() == 'x'){
        score = _minimax(board, 0, -Infinity, Infinity, true);
      }
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        moveIndex = i;
      }
    }
  }
  return moveIndex;
}