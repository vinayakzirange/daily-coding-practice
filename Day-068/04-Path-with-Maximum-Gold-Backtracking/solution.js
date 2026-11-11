/**
 * Problem: Path with Maximum Gold (LeetCode 1219)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * In a gold mine grid of size m x n, each cell in this mine has an integer representing
 * the amount of gold in that cell, 0 if it is empty.
 * 
 * Return the maximum amount of gold you can collect under the conditions:
 *  - Every time you are in a cell, you will collect all the gold in that cell.
 *  - From your position, you can walk one step to the left, right, up, or down.
 *  - You can't visit the same cell more than once in the same path.
 *  - Never visit a cell with 0 gold.
 *  - You can start and stop collecting gold from any position in the grid that has some gold.
 * 
 * Example 1:
 *  Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
 *  Output: 24
 *  Explanation: Path: 9 -> 8 -> 7.
 * 
 * Example 2:
 *  Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
 *  Output: 28
 *  Explanation: Path: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.
 * 
 * Constraints:
 *  m == grid.length
 *  n == grid[i].length
 *  1 <= m, n <= 15
 *  0 <= grid[i][j] <= 100
 *  There are at most 25 cells containing gold.
 */

/**
 * Finds maximum gold collectable using Backtracking Depth-First Search.
 * 
 * @param {number[][]} grid
 * @return {number}
 * 
 * Complexity:
 *  Time: O(K * 3^K) where K <= 25 is the count of gold cells (branching factor 3 after first step).
 *  Space: O(K) for recursion depth.
 */
function getMaximumGold(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let maxGold = 0;

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    function dfs(r, c) {
        const gold = grid[r][c];
        grid[r][c] = 0; // Mark visited by setting to 0

        let maxFromNext = 0;
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] > 0) {
                maxFromNext = Math.max(maxFromNext, dfs(nr, nc));
            }
        }

        grid[r][c] = gold; // Backtrack
        return gold + maxFromNext;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] > 0) {
                maxGold = Math.max(maxGold, dfs(r, c));
            }
        }
    }

    return maxGold;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const g1 = [
        [0, 6, 0],
        [5, 8, 7],
        [0, 9, 0]
    ];
    assert.strictEqual(getMaximumGold(g1), 24, "Test 1 Failed");

    // Test 2: Example 2
    const g2 = [
        [1, 0, 7],
        [2, 0, 6],
        [3, 4, 5],
        [0, 3, 0],
        [9, 0, 20]
    ];
    assert.strictEqual(getMaximumGold(g2), 28, "Test 2 Failed");

    // Test 3: No gold
    const g3 = [[0, 0], [0, 0]];
    assert.strictEqual(getMaximumGold(g3), 0, "Test 3 Failed");

    // Test 4: Single cell
    const g4 = [[10]];
    assert.strictEqual(getMaximumGold(g4), 10, "Test 4 Failed");

    console.log("All Path with Maximum Gold tests passed successfully!");
}

runTests();
