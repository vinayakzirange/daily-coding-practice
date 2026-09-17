/**
 * Problem: Number of Islands
 * Topic: 2D Grid / DFS / Connected Components
 * Language: JavaScript
 *
 * Approach:
 * Scan the 2D grid. When encountering land '1', increment island count and trigger a DFS
 * sink procedure replacing connected land cells '1' with water '0'.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N) recursion stack in worst case
 */

function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    let islandCount = 0;

    function dfs(r, c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '0') {
            return;
        }
        grid[r][c] = '0'; // sink land
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                dfs(r, c);
            }
        }
    }

    return islandCount;
}

// Test cases
const grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
console.log("Islands ->", numIslands(grid)); // 1
