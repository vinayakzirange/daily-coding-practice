/**
 * LeetCode 1020: Number of Enclaves (Medium)
 * https://leetcode.com/problems/number-of-enclaves/
 *
 * You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.
 *
 * A move consists of walking from one land cell to another adjacent (4-directionally) land cell
 * or walking off the boundary of the grid.
 *
 * Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.
 *
 * Example 1:
 * Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
 * Output: 3
 * Explanation: There are three 1s that are enclosed by 0s, and one 1 that isn't because it's on the boundary.
 *
 * Example 2:
 * Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
 * Output: 0
 * Explanation: All 1s are either on the boundary or can reach the boundary.
 *
 * Constraints:
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 500
 * - grid[i][j] is either 0 or 1.
 *
 * @param {number[][]} grid
 * @return {number}
 */
function numEnclaves(grid) {
    const m = grid.length;
    const n = grid[0].length;

    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== 1) {
            return;
        }
        grid[r][c] = 0; // Mark visited / flooded

        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    // Flood fill all land cells connected to boundary edges
    for (let r = 0; r < m; r++) {
        if (grid[r][0] === 1) dfs(r, 0);
        if (grid[r][n - 1] === 1) dfs(r, n - 1);
    }
    for (let c = 0; c < n; c++) {
        if (grid[0][c] === 1) dfs(0, c);
        if (grid[m - 1][c] === 1) dfs(m - 1, c);
    }

    // Count all remaining land cells (true enclaves that cannot reach the boundary)
    let enclaves = 0;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                enclaves++;
            }
        }
    }

    return enclaves;
}

// Unit tests
function runTests() {
    // Test 1: Example 1 -> 3 enclaves
    const g1 = [
        [0, 0, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ];
    console.assert(numEnclaves(g1) === 3, "Test 1 Failed");

    // Test 2: Example 2 -> 0 enclaves
    const g2 = [
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
    ];
    console.assert(numEnclaves(g2) === 0, "Test 2 Failed");

    // Test 3: No enclaves (all 0s)
    const g3 = [
        [0, 0],
        [0, 0]
    ];
    console.assert(numEnclaves(g3) === 0, "Test 3 Failed");

    // Test 4: Fully enclosed single cell
    const g4 = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    console.assert(numEnclaves(g4) === 1, "Test 4 Failed");

    console.log("All Number of Enclaves tests passed successfully!");
}

runTests();

