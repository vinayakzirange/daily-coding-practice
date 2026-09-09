/*
 * Problem Name: Longest Increasing Path in a Matrix
 * Problem Statement: Given an m x n integers matrix, return the length of the longest increasing path in matrix.
 * From each cell, you can move in four directions (up, down, left, right).
 * 
 * Approach: DFS with Memoization (2D DP). Cache result for each cell (r, c) to avoid recomputation.
 * 
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

function longestIncreasingPath(matrix) {
  if (!matrix || matrix.length === 0) return 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  const memo = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function dfs(r, c) {
    if (memo[r][c] !== 0) return memo[r][c];

    let maxPath = 1;
    for (let [dr, dc] of dirs) {
      let nr = r + dr;
      let nc = c + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] > matrix[r][c]) {
        maxPath = Math.max(maxPath, 1 + dfs(nr, nc));
      }
    }

    memo[r][c] = maxPath;
    return maxPath;
  }

  let longest = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      longest = Math.max(longest, dfs(r, c));
    }
  }

  return longest;
}

const matrix = [
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1]
];
console.log("Longest Increasing Path:", longestIncreasingPath(matrix)); // Expected: 4 ([1, 2, 6, 9])
