"""
Problem: Longest Increasing Path in a Matrix (LeetCode 329)
Language: Python
Difficulty: Hard / Medium-Hard
Time Complexity: O(M * N)
Space Complexity: O(M * N)
"""

from typing import List

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if not matrix or not matrix[0]:
            return 0

        m, n = len(matrix), len(matrix[0])
        memo = [[0] * n for _ in range(m)]

        def dfs(r: int, c: int) -> int:
            if memo[r][c] != 0:
                return memo[r][c]

            max_len = 1
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    max_len = max(max_len, 1 + dfs(nr, nc))

            memo[r][c] = max_len
            return max_len

        ans = 0
        for i in range(m):
            for j in range(n):
                ans = max(ans, dfs(i, j))

        return ans

if __name__ == "__main__":
    sol = Solution()
    matrix = [
        [9, 9, 4],
        [6, 6, 8],
        [2, 1, 1]
    ]
    print("Longest Increasing Path:", sol.longestIncreasingPath(matrix))  # 4 ([1, 2, 6, 9])
