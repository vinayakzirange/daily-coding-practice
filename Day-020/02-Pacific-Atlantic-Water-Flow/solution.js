/**
 * Problem: Pacific Atlantic Water Flow
 * Topic: 2D Grid / Multi-Source BFS/DFS
 * Language: JavaScript
 *
 * Approach:
 * Run multi-source DFS starting from ocean boundaries (Pacific from top/left, Atlantic from bottom/right)
 * moving inward to higher/equal elevation cells. The intersection of cells reachable by both oceans is the answer.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

function pacificAtlantic(heights) {
    if (!heights || heights.length === 0) return [];
    const rows = heights.length;
    const cols = heights[0].length;

    const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));

    function dfs(r, c, ocean, prevHeight) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (ocean[r][c] || heights[r][c] < prevHeight) return;

        ocean[r][c] = true;
        dfs(r + 1, c, ocean, heights[r][c]);
        dfs(r - 1, c, ocean, heights[r][c]);
        dfs(r, c + 1, ocean, heights[r][c]);
        dfs(r, c - 1, ocean, heights[r][c]);
    }

    for (let c = 0; c < cols; c++) {
        dfs(0, c, pacific, heights[0][c]);
        dfs(rows - 1, c, atlantic, heights[rows - 1][c]);
    }
    for (let r = 0; r < rows; r++) {
        dfs(r, 0, pacific, heights[r][0]);
        dfs(r, cols - 1, atlantic, heights[r][cols - 1]);
    }

    const result = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }
    return result;
}

// Test cases
const grid = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
];
console.log("Pacific Atlantic Reachable Cells ->", pacificAtlantic(grid));
