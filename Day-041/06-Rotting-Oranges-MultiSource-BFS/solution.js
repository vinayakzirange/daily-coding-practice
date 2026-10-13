/**
 * Problem: Rotting Oranges (LeetCode 994)
 * Difficulty: Medium
 * Topic: Breadth-First Search / Matrix / Array / Multi-Source BFS
 *
 * Description:
 * You are given an m x n grid where each cell can have one of three values:
 * - 0 representing an empty cell,
 * - 1 representing a fresh orange, or
 * - 2 representing a rotten orange.
 *
 * Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange
 * becomes rotten.
 *
 * Return the minimum number of minutes that must elapse until no cell has a fresh
 * orange. If this is impossible, return -1.
 *
 * Example 1:
 * Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 *
 * Example 2:
 * Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten,
 * because rotting only happens 4-directionally.
 *
 * Example 3:
 * Input: grid = [[0,2]]
 * Output: 0
 * Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 *
 * Constraints:
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 10
 * - grid[i][j] is 0, 1, or 2.
 *
 * Complexity Analysis:
 * - Time Complexity: O(m * n) since each cell is visited at most once.
 * - Space Complexity: O(m * n) for the BFS queue.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let freshCount = 0;
    const queue = [];

    // Find all starting rotten oranges and count fresh oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    if (freshCount === 0) return 0;

    let minutes = 0;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Multi-source BFS level by level
    while (queue.length > 0 && freshCount > 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const [r, c] = queue.shift();

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2; // Mark as rotten
                    freshCount--;
                    queue.push([nr, nc]);
                }
            }
        }
        minutes++;
    }

    return freshCount === 0 ? minutes : -1;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    {
        grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]],
        expected: 4
    },
    {
        grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]],
        expected: -1
    },
    {
        grid: [[0, 2]],
        expected: 0
    },
    {
        grid: [[0]],
        expected: 0
    },
    {
        grid: [[1]],
        expected: -1
    },
    {
        grid: [[2, 2], [1, 1], [0, 0], [2, 0]],
        expected: 1
    }
];

testCases.forEach((tc, idx) => {
    // Deep copy grid for purity in testing
    const gridCopy = tc.grid.map(row => [...row]);
    const result = orangesRotting(gridCopy);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: grid=${tc.grid.length}x${tc.grid[0].length} -> minutes = ${result}`);
});

console.log("\nAll Rotting Oranges tests passed successfully!");
