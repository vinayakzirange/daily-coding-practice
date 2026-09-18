/**
 * Problem: Word Search in 2D Grid
 * Topic: 2D Grid / Backtracking / DFS
 * Language: JavaScript
 *
 * Approach:
 * For each starting cell matching word[0], trigger DFS backtracking. Temporarily mark cell as visited,
 * check adjacent 4 directions for word[idx+1], then restore original cell character (backtrack).
 *
 * Time Complexity: O(N * M * 4^L) where L is length of word
 * Space Complexity: O(L) recursion stack
 */

function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    function dfs(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[idx]) {
            return false;
        }

        const temp = board[r][c];
        board[r][c] = '#'; // mark visited

        const found = dfs(r + 1, c, idx + 1) ||
                      dfs(r - 1, c, idx + 1) ||
                      dfs(r, c + 1, idx + 1) ||
                      dfs(r, c - 1, idx + 1);

        board[r][c] = temp; // backtrack
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

// Test cases
const board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
console.log("ABCCED ->", exist(board, "ABCCED")); // true
console.log("SEE ->", exist(board, "SEE")); // true
console.log("ABCB ->", exist(board, "ABCB")); // false
