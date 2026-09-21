/**
 * Problem: Longest Increasing Path in a Matrix
 * Topic: 2D Grid DP + DFS / Memoization
 * Language: JavaScript
 *
 * Approach:
 * Run DFS with memoization (2D DP array) from every cell. Move in 4 directions to strictly greater cells.
 * Return 1 + max(increasing paths from valid neighbors).
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

function longestIncreasingPath(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const memo = Array.from({ length: rows }, () => new Array(cols).fill(0));
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(r, c) {
        if (memo[r][c] !== 0) return memo[r][c];
        let maxLen = 1;

        for (let [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] > matrix[r][c]) {
                maxLen = Math.max(maxLen, 1 + dfs(nr, nc));
            }
        }
        memo[r][c] = maxLen;
        return maxLen;
    }

    let overallMax = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            overallMax = Math.max(overallMax, dfs(r, c));
        }
    }
    return overallMax;
}

// Test cases
const grid = [
  [9,9,4],
  [6,6,8],
  [2,1,1]
];
console.log("Longest Increasing Path ->", longestIncreasingPath(grid)); // 4 ([1, 2, 6, 9])
