/*
 * Problem Name: Word Search in Grid
 * Problem Statement: Given an m x n grid of characters board and a string word, return true if word exists in the grid.
 * The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically).
 * 
 * Approach: Backtracking DFS from every matching starting cell. Mark visited cells temporarily.
 * 
 * Time Complexity: O(M * N * 4^L) where L is length of word
 * Space Complexity: O(L) recursion stack depth
 */

function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[index]) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = '#'; // Mark visited

    const found = dfs(r + 1, c, index + 1) ||
                  dfs(r - 1, c, index + 1) ||
                  dfs(r, c + 1, index + 1) ||
                  dfs(r, c - 1, index + 1);

    board[r][c] = temp; // Backtrack
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) {
        return true;
      }
    }
  }

  return false;
}

const board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
console.log("Word 'ABCCED' exists:", exist(board, "ABCCED")); // Expected: true
console.log("Word 'SEE' exists:", exist(board, "SEE"));       // Expected: true
console.log("Word 'ABCB' exists:", exist(board, "ABCB"));     // Expected: false
