/*
 * Problem Name: Pacific Atlantic Water Flow
 * Problem Statement: Given an m x n rectangular island heights grid, water flows to both Pacific (top/left) and Atlantic (bottom/right) oceans.
 * Return a 2D list of grid coordinates where water can flow to BOTH oceans.
 * 
 * Approach: Multi-source BFS/DFS starting backwards from ocean borders inwards (uphill flow height >= prevHeight).
 * Find intersection of cells reachable from Pacific and Atlantic.
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

  function dfs(r, c, reachableSet, prevHeight) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || reachableSet[r][c] || heights[r][c] < prevHeight) {
      return;
    }

    reachableSet[r][c] = true;

    dfs(r + 1, c, reachableSet, heights[r][c]);
    dfs(r - 1, c, reachableSet, heights[r][c]);
    dfs(r, c + 1, reachableSet, heights[r][c]);
    dfs(r, c - 1, reachableSet, heights[r][c]);
  }

  // Border flows
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pacific, heights[r][0]);
    dfs(r, cols - 1, atlantic, heights[r][cols - 1]);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pacific, heights[0][c]);
    dfs(rows - 1, c, atlantic, heights[rows - 1][c]);
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

const island = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4]
];
console.log("Reachable Cells:", pacificAtlantic(island));
// Expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
