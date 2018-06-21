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

  var generateBoard = function(board, rookCount) {
    if (rookCount === n) {
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
  var solution = generateBoard(board, count);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

// nreturn the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n':n});
  // var count = 0;
  // var output = [];
  // var copycount = 0;

  var generateBoard = function(rowIndex) {
    if (rowIndex === n) {
      // output.push(board);
      solutionCount++;
      /// THIS IS WHERE THE BUG IS
      // var copy = JSON.stringify(board.toJSON()); 
      // output[copy] = 1;
      
      return;
    }
    for (let i = 0; i < n; i++) {
          board.attributes[rowIndex][i] = 1;
          if (!board.hasAnyRooksConflicts()) {
            generateBoard(rowIndex+1);
          } 
          board.attributes[rowIndex][i] = 0;
    }
  }


  generateBoard(0);
  // var boardCount = {};
  
  // for (let i = 0; i < output.length; i++) {
  //   var key = JSON.stringify(output[i]);
  //   if (boardCount[key] === undefined) {
  //     boardCount[key] = 1;
  //   } else {
  //     boardCount[key]++;
  //   }
  // }
  // console.log(output);
  // var solutionCount = Object.keys(boardCount).length;
  
  /// HELPER FUNCTION .... iterate through output, stringify each element, store in a counter object
  /// return number of keys

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // var keyCount = 0;
  // var a = Object.values(output);
  // for (var i = 0; i < a.length; i++) {
  //   keyCount++;
  // };
  
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
