"""
Problem Name: Number of Islands
Problem Statement: Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water),
return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

Approach: Depth-First Search (DFS). Traverse every cell. When a '1' is found, increment island count and
run DFS to sink all connected '1's to '0'.

Time Complexity: O(M * N)
Space Complexity: O(M * N) worst case recursion stack
"""

from typing import List

class Solution:
    @staticmethod
    def numIslands(grid: List[List[str]]) -> int:
        if not grid:
            return 0

        rows, cols = len(grid), len(grid[0])
        num_islands = 0

        def dfs(r: int, c: int):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
                return
            grid[r][c] = '0'  # Sink the land
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    num_islands += 1
                    dfs(r, c)

        return num_islands

if __name__ == "__main__":
    grid = [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
    ]
    print("Number of Islands:", Solution.numIslands(grid))  # Expected: 1
