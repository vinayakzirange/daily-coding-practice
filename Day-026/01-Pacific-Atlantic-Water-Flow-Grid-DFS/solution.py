"""
Problem: Pacific Atlantic Water Flow (LeetCode 417)
Language: Python
Difficulty: Medium
Time Complexity: O(M * N)
Space Complexity: O(M * N)
"""

from typing import List

class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        if not heights or not heights[0]:
            return []

        m, n = len(heights), len(heights[0])
        pacific = [[False] * n for _ in range(m)]
        atlantic = [[False] * n for _ in range(m)]

        def dfs(r: int, c: int, ocean: List[List[bool]]):
            ocean[r][c] = True
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not ocean[nr][nc] and heights[nr][nc] >= heights[r][c]:
                    dfs(nr, nc, ocean)

        for i in range(m):
            dfs(i, 0, pacific)
            dfs(i, n - 1, atlantic)

        for j in range(n):
            dfs(0, j, pacific)
            dfs(m - 1, j, atlantic)

        res = []
        for i in range(m):
            for j in range(n):
                if pacific[i][j] and atlantic[i][j]:
                    res.append([i, j])

        return res

if __name__ == "__main__":
    sol = Solution()
    heights = [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4]
    ]
    print("Output:", sol.pacificAtlantic(heights))
