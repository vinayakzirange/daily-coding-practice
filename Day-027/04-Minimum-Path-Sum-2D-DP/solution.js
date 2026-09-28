// Problem: Minimum Path Sum (LeetCode 64)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(M * N)
// Space Complexity: O(1) in-place or O(N)

function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            if (i === 0) {
                grid[i][j] += grid[i][j - 1];
            } else if (j === 0) {
                grid[i][j] += grid[i - 1][j];
            } else {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
    }

    return grid[m - 1][n - 1];
}

// Test cases
const grid1 = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];
console.log("Min Path Sum:", minPathSum(grid1)); // 7 (1->3->1->1->1)
