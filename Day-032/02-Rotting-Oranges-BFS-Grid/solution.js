// Problem: Rotting Oranges (LeetCode 994)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(M * N)
// Space Complexity: O(M * N) queue space

/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;

    // Step 1: Collect initial rotten oranges and count fresh oranges
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

    // Step 2: Multi-source BFS
    while (queue.length > 0 && freshCount > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const [cr, cc] = queue.shift();

            for (const [dr, dc] of directions) {
                const nr = cr + dr;
                const nc = cc + dc;

                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2; // Make orange rotten
                    freshCount--;
                    queue.push([nr, nc]);
                }
            }
        }
        minutes++;
    }

    return freshCount === 0 ? minutes : -1;
}

// Test cases
const grid1 = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
];
console.log("Minutes to rot all oranges (Grid 1):", orangesRotting(grid1)); // Expected: 4

const grid2 = [
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1]
];
console.log("Minutes to rot all oranges (Grid 2):", orangesRotting(grid2)); // Expected: -1

const grid3 = [
    [0, 2]
];
console.log("Minutes to rot all oranges (Grid 3):", orangesRotting(grid3)); // Expected: 0
