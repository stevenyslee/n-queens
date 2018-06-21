/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({'n':n});
  var count = 0;
  /// var output = [];

  var generateBoard = function(board, rookCount) {
    if (rookCount === n) {
      // output.push(board.rows());
      return board.rows();
    }
    for (let i = 0; i < board.attributes.n; i++) {
      if (board.get(i).indexOf(1) === -1) {
        for (let j = 0; j < board.get(i).length; j++) {
          board.togglePiece(i, j);
          if (!board.hasAnyRooksConflicts()) {
            return generateBoard(board, rookCount+1);
          } else {
            board.togglePiece(i, j);
          }

        }
      }
    }
  }
  /// HELPER FUNCTION .... iterate through output, stringify each element, store in a counter object
  /// return number of keys
  var solution = generateBoard(board, count);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

// nreturn the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
