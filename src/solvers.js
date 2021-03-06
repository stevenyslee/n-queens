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
// Time Complexity: O(n^n)
window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  var count = 0;

  var generateBoard = function(board, rookCount) {
    if (rookCount === n) {
      return board.rows();
    }
    for (let i = 0; i < board.attributes.n; i++) {  //Time Complexity: O(n)
      if (board.get(i).indexOf(1) === -1) {
        for (let j = 0; j < board.get(i).length; j++) {  //Time Complexity: O(n)
          board.togglePiece(i, j);
          if (!board.hasAnyRooksConflicts()) {
            return generateBoard(board, rookCount + 1);
          } else {
            board.togglePiece(i, j);
          }
        }
      }
    }
  };
  var solution = generateBoard(board, count);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

// nreturn the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// Time Complexity: O(n^n)
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 0;
  }
  
  if (n === 1) {
    return 1;
  }
  var solutionCount = 0; //fixme
  var board = new Board({'n': n});

  // var generateBoard = function(rowIndex) {
  //   if (rowIndex === n) {
  //     solutionCount++;
  //     return;
  //   }

  //   for (let i = 0; i < n; i++) {
  //     board.attributes[rowIndex][i] = 1;
  //     if (!board.hasAnyRooksConflicts()) {
  //       generateBoard(rowIndex + 1);
  //     } 
  //     board.attributes[rowIndex][i] = 0;
  //   }
  // };
  
  var generateBoard = function(rowIndex, isMiddle) {
    if (rowIndex === n) {
      solutionCount++;
      return true;
    }
    
    if (board.get('n') % 2 === 0) {
      /// EVEN
      if (rowIndex === 0) {
        //first row
        for (let i = 0; i < (n / 2); i++) {
          board.attributes[rowIndex][i] = 1;
          if (!board.hasAnyRooksConflicts()) {
            generateBoard(rowIndex + 1); 
          } 
          board.attributes[rowIndex][i] = 0;
        }
      } else {
        // Not first row 
        for (let i = 0; i < n; i++) {
          board.attributes[rowIndex][i] = 1;
          if (!board.hasAnyRooksConflicts()) {
            var hasSolution = generateBoard(rowIndex + 1);
            if (hasSolution) {
              solutionCount++;
            }
          } 
          board.attributes[rowIndex][i] = 0;
        } 
      }
      
    } else {
      /// ODD  
      if (rowIndex === 0) {
        //first row
        for (let i = 0; i < Math.floor(n / 2) + 1; i++) {
          board.attributes[rowIndex][i] = 1;
          if (!board.hasAnyRooksConflicts()) {
            if (i === Math.floor(n / 2) ) {
              generateBoard(rowIndex + 1, true);  
            } else {
              generateBoard(rowIndex + 1); 
            }
          } 
          board.attributes[rowIndex][i] = 0;
        }
  
      } else {
        // Not first row
        if (isMiddle) {
          for (let i = 0; i < n; i++) {
            board.attributes[rowIndex][i] = 1;
            if (!board.hasAnyRooksConflicts()) {
              generateBoard(rowIndex + 1, true);
            } 
            board.attributes[rowIndex][i] = 0;
          }  
        } else {
          for (let i = 0; i < n; i++) {
            board.attributes[rowIndex][i] = 1;
            if (!board.hasAnyRooksConflicts()) {
              var hasSolution = generateBoard(rowIndex + 1);
              if (hasSolution) {
                solutionCount++;
              }
            } 
            board.attributes[rowIndex][i] = 0;
          }
        }
        
      }
      
    }
  };
  

  generateBoard(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  
  return solutionCount; 
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// Time Complexity: O(n^n)
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var queenSolution;

  var generateBoard = function(rowIndex) {
    if (rowIndex === n) {
      return board.rows();
    }
    for (let i = 0; i < n; i++) {
      board.attributes[rowIndex][i] = 1;
      if (!board.hasAnyQueensConflicts()) {
        var solution = generateBoard(rowIndex + 1);
        if (solution) {
          return solution;
        }
      } 
      board.attributes[rowIndex][i] = 0;
    }
  };

  var result = generateBoard(0) || board.rows();
  return result;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// Time Complexity: O(n^n)
window.countNQueensSolutions = function(n) {
  if (n === 2 || n === 3) {
    return 0;
  }
  
  var solutionCount = 0; //fixme
  var board = new Board({'n': n});
  
  

  var generateBoard = function(rowIndex, isMiddle) {
    if (rowIndex === n) {
      solutionCount++;
      return true;
    }
    
    if (board.get('n') % 2 === 0) {
      /// EVEN
      if (rowIndex === 0) {
        //first row
        for (let i = 0; i < (n / 2); i++) {
          board.attributes[rowIndex][i] = 1;
          if (!board.hasAnyQueensConflicts()) {
            generateBoard(rowIndex + 1); 
          } 
          board.attributes[rowIndex][i] = 0;
        }
      } else {
        // Not first row 
        for (let i = 0; i < n; i++) {
          board.attributes[rowIndex][i] = 1;
          if (!board.hasAnyQueensConflicts()) {
            var hasSolution = generateBoard(rowIndex + 1);
            if (hasSolution) {
              solutionCount++;
            }
          } 
          board.attributes[rowIndex][i] = 0;
        } 
      }
      
    } else {
      /// ODD  
      if (rowIndex === 0) {
        //first row
        for (let i = 0; i < Math.floor(n / 2) + 1; i++) {
          board.attributes[rowIndex][i] = 1;
          if (!board.hasAnyQueensConflicts()) {
            if (i === Math.floor(n / 2) ) {
              generateBoard(rowIndex + 1, true);  
            } else {
              generateBoard(rowIndex + 1); 
            }
          } 
          board.attributes[rowIndex][i] = 0;
        }
  
      } else {
        // Not first row
        if (isMiddle) {
          for (let i = 0; i < n; i++) {
            board.attributes[rowIndex][i] = 1;
            if (!board.hasAnyQueensConflicts()) {
              generateBoard(rowIndex + 1, true);
            } 
            board.attributes[rowIndex][i] = 0;
          }  
        } else {
          for (let i = 0; i < n; i++) {
            board.attributes[rowIndex][i] = 1;
            if (!board.hasAnyQueensConflicts()) {
              var hasSolution = generateBoard(rowIndex + 1);
              if (hasSolution) {
                solutionCount++;
              }
            } 
            board.attributes[rowIndex][i] = 0;
          }
        }
        
      }
      
    }
  };
  
  // var generateBoard = function(rowIndex) {
  //   if (rowIndex === n) {
  //     solutionCount++;
  //     return;
  //   }
  //   for (let i = 0; i < n; i++) {
  //     board.attributes[rowIndex][i] = 1;
  //     if (!board.hasAnyQueensConflicts()) {
  //       generateBoard(rowIndex + 1);
  //     } 
  //     board.attributes[rowIndex][i] = 0;
  //   }
  // };
  
  
  
  
  
  
  
  
  
  
  

  generateBoard(0);
  return solutionCount; 
};
