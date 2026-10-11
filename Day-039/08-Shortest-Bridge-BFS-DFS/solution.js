/**
 * Problem: Shortest Bridge (LeetCode 934)
 * Difficulty: Medium
 * Topic: 2D Grid / Depth-First Search / Breadth-First Search / Matrix
 * 
 * Description:
 * You are given an n x n binary matrix grid where 1 represents land and 0 represents water.
 * 
 * An island is a 4-directionally connected group of 1's not connected to any other 1's.
 * There are exactly two islands in grid.
 * 
 * You may change 0's to 1's to connect the two islands to form one island.
 * 
 * Return the smallest number of 0's you must flip to connect the two islands.
 * 
 * Example 1:
 * Input: grid = [[0,1],[1,0]]
 * Output: 1
 * 
 * Example 2:
 * Input: grid = [[0,1,0],[0,0,0],[0,0,1]]
 * Output: 2
 * 
 * Example 3:
 * Input: grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
 * Output: 1
 * 
 * Constraints:
 *   * n == grid.length == grid[i].length
 *   * 2 <= n <= 100
 *   * grid[i][j] is either 0 or 1.
 *   * There are exactly two islands in grid.
 * 
 * Complexity:
 *   * Time Complexity: O(n^2) - DFS labels 1st island, BFS expands water cells once.
 *   * Space Complexity: O(n^2) - Queue and visited set.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
function shortestBridge(grid) {
    const n = grid.length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const queue = [];
    let foundFirstIsland = false;

    // DFS to find and collect all cells belonging to the first island
    function dfs(r, c) {
        grid[r][c] = 2; // Mark as visited first island
        queue.push([r, c, 0]);

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                dfs(nr, nc);
            }
        }
    }

    // Step 1: Discover first island with DFS
    for (let r = 0; r < n && !foundFirstIsland; r++) {
        for (let c = 0; c < n && !foundFirstIsland; c++) {
            if (grid[r][c] === 1) {
                dfs(r, c);
                foundFirstIsland = true;
            }
        }
    }

    // Step 2: Multi-source BFS expanding outwards to find second island
    let head = 0;
    while (head < queue.length) {
        const [r, c, dist] = queue[head++];

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                if (grid[nr][nc] === 1) {
                    // Reached the second island!
                    return dist;
                } else if (grid[nr][nc] === 0) {
                    grid[nr][nc] = 2; // Mark water cell visited
                    queue.push([nr, nc, dist + 1]);
                }
            }
        }
    }

    return -1;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        {
            grid: [[0, 1], [1, 0]],
            expected: 1
        },
        {
            grid: [[0, 1, 0], [0, 0, 0], [0, 0, 1]],
            expected: 2
        },
        {
            grid: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1]
            ],
            expected: 1
        }
    ];

    testCases.forEach((tc, idx) => {
        const copy = tc.grid.map(row => [...row]);
        const result = shortestBridge(copy);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: grid size ${tc.grid.length}x${tc.grid.length} -> shortest bridge = ${result}`);
    });

    console.log('\nAll Shortest Bridge tests passed successfully!');
}

runTests();
