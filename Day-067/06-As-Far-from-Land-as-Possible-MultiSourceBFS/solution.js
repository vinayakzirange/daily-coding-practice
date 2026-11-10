/**
 * Problem: As Far from Land as Possible (LeetCode 1162)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given an n x n grid containing only values 0 and 1, where 0 represents water and 1 represents land,
 * find a water cell such that its distance to the nearest land cell is maximized, and return the distance.
 * If no land or water exists in the grid, return -1.
 * 
 * The distance used here is the Manhattan distance: |x0 - x1| + |y0 - y1|.
 * 
 * Example 1:
 *  Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
 *  Output: 2
 *  Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.
 * 
 * Example 2:
 *  Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
 *  Output: 4
 *  Explanation: The cell (2, 2) is as far as possible from all the land with distance 4.
 * 
 * Constraints:
 *  n == grid.length == grid[i].length
 *  1 <= n <= 100
 *  grid[i][j] is 0 or 1
 */

/**
 * Finds maximum distance from any water cell to nearest land using Multi-Source BFS.
 * 
 * @param {number[][]} grid
 * @return {number}
 * 
 * Complexity:
 *  Time: O(n^2) - Every cell in the n x n grid is visited at most once.
 *  Space: O(n^2) - BFS queue storing grid coordinates.
 */
function maxDistance(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    // Clone grid to avoid mutating original test inputs
    const g = grid.map(row => [...row]);
    const queue = [];

    // Push all land cells as multi-source BFS origins
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (g[r][c] === 1) {
                queue.push([r, c]);
            }
        }
    }

    // If grid contains only land or only water, no valid water-land pair exists
    if (queue.length === 0 || queue.length === rows * cols) {
        return -1;
    }

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let maxDist = -1;
    let head = 0;

    while (head < queue.length) {
        const [r, c] = queue[head++];

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 0) {
                g[nr][nc] = g[r][c] + 1;
                maxDist = Math.max(maxDist, g[nr][nc] - 1);
                queue.push([nr, nc]);
            }
        }
    }

    return maxDist;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const g1 = [[1, 0, 1], [0, 0, 0], [1, 0, 1]];
    assert.strictEqual(maxDistance(g1), 2, "Test 1 Failed");

    // Test 2: Example 2
    const g2 = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];
    assert.strictEqual(maxDistance(g2), 4, "Test 2 Failed");

    // Test 3: All land
    const g3 = [[1, 1], [1, 1]];
    assert.strictEqual(maxDistance(g3), -1, "Test 3 Failed (All Land)");

    // Test 4: All water
    const g4 = [[0, 0], [0, 0]];
    assert.strictEqual(maxDistance(g4), -1, "Test 4 Failed (All Water)");

    // Test 5: Single cell water
    const g5 = [[0]];
    assert.strictEqual(maxDistance(g5), -1, "Test 5 Failed");

    // Test 6: 1x2 grid [1, 0]
    const g6 = [[1, 0]];
    assert.strictEqual(maxDistance(g6), 1, "Test 6 Failed");

    console.log("All As Far from Land as Possible tests passed successfully!");
}

runTests();
