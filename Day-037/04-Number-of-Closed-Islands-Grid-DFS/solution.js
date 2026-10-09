/**
 * Problem: Number of Closed Islands (LeetCode 1254)
 * Difficulty: Medium
 * Topic: 2D Grid / DFS / Flood Fill / Connected Components
 * 
 * Description:
 * Given a 2D grid consists of 0s (land) and 1s (water). An island is a maximal 
 * 4-directionally connected group of 0s and a closed island is totally surrounded 
 * by 1s (top, left, bottom, right).
 * 
 * Return the number of closed islands.
 * 
 * Example 1:
 * Input: grid = [
 *   [1,1,1,1,1,1,1,0],
 *   [1,0,0,0,0,1,1,0],
 *   [1,0,1,0,1,1,1,0],
 *   [1,0,0,0,0,1,0,1],
 *   [1,1,1,1,1,1,1,0]
 * ]
 * Output: 2
 * 
 * Example 2:
 * Input: grid = [
 *   [0,0,1,0,0],
 *   [0,1,0,1,0],
 *   [0,1,1,1,0]
 * ]
 * Output: 1
 * 
 * Example 3:
 * Input: grid = [
 *   [1,1,1,1,1,1,1],
 *   [1,0,0,0,0,0,1],
 *   [1,0,1,1,1,0,1],
 *   [1,0,1,0,1,0,1],
 *   [1,0,1,1,1,0,1],
 *   [1,0,0,0,0,0,1],
 *   [1,1,1,1,1,1,1]
 * ]
 * Output: 2
 * 
 * Constraints:
 *   * 1 <= grid.length, grid[0].length <= 100
 *   * 0 <= grid[i][j] <= 1
 * 
 * Complexity:
 *   * Time Complexity: O(m * n) where m and n are grid dimensions.
 *   * Space Complexity: O(m * n) call stack in the worst case flood fill.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
function closedIsland(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Helper: DFS flood fill turning land (0) into water (1)
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 1) {
            return;
        }
        grid[r][c] = 1; // Mark visited / fill with water
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    // Step 1: Flood fill all boundary connected land (0s on 4 edges cannot be closed)
    for (let r = 0; r < rows; r++) {
        if (grid[r][0] === 0) dfs(r, 0);
        if (grid[r][cols - 1] === 0) dfs(r, cols - 1);
    }
    for (let c = 0; c < cols; c++) {
        if (grid[0][c] === 0) dfs(0, c);
        if (grid[rows - 1][c] === 0) dfs(rows - 1, c);
    }

    // Step 2: Any remaining 0s must be completely enclosed by 1s
    let closedCount = 0;
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (grid[r][c] === 0) {
                closedCount++;
                dfs(r, c); // Fill this closed island
            }
        }
    }

    return closedCount;
}

// Driver Tests
function runTests() {
    console.log("=== Running Number of Closed Islands Tests ===");

    const g1 = [
        [1,1,1,1,1,1,1,0],
        [1,0,0,0,0,1,1,0],
        [1,0,1,0,1,1,1,0],
        [1,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,0]
    ];
    const res1 = closedIsland(g1);
    console.log(`Test 1: Output=${res1}, Expected=2 | Pass: ${res1 === 2}`);

    const g2 = [
        [0,0,1,0,0],
        [0,1,0,1,0],
        [0,1,1,1,0]
    ];
    const res2 = closedIsland(g2);
    console.log(`Test 2: Output=${res2}, Expected=1 | Pass: ${res2 === 1}`);

    const g3 = [
        [1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,0,1,0,1],
        [1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1]
    ];
    const res3 = closedIsland(g3);
    console.log(`Test 3: Output=${res3}, Expected=2 | Pass: ${res3 === 2}`);
}

runTests();
