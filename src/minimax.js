function findBestMove() {
  let bestScore = -Infinity;
  let move;
  let board = gameBoard.getBoardArr();
  let ai = AI.getTTT();

  for (let i = 0; i < 9; i++) {
    if (board[i] == '') {
      gameBoard.setTile(ai, i);
      let score = minimax(board, 0, -Infinity, Infinity, false);
      gameBoard.setTile('', i);

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
      console.log(ai);
      console.log(gameBoard.getBoardArr())
      console.log(board[i]);
      console.log(move);
    }
  }
  return move;
}

function minimax(board, depth, a, b, isMaximizing) {
  if (depth == 0){
    
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == '') {
        gameBoard.setTile(AI.getTTT(), i);
        bestScore = Math.max(bestScore, minimax(board, depth+1, a, b, false));
        gameBoard.setTile('', i);
        b = Math.max(b, bestScore);
        if (a > b){
            break;
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == '') {
        gameBoard.setTile(Player.getTTT(), i);
        bestScore = Math.min(bestScore, minimax(board, depth+1, a, b, true));
        gameBoard.setTile('', i);
        a = Math.min(a, bestScore);
        if (b > a){
          break;
        }
      }
    }
    return bestScore;
  }
}