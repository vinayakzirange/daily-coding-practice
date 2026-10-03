"""
Problem: Unique Paths II (LeetCode 63)
Language: Python
Difficulty: Medium
Time Complexity: O(M * N)
Space Complexity: O(N) or O(M * N)
"""

from typing import List

class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        if not obstacleGrid or obstacleGrid[0][0] == 1:
            return 0

        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [0] * n
        dp[0] = 1

        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j - 1]

        return dp[n - 1]

if __name__ == "__main__":
    sol = Solution()
    grid = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ]
    print("Unique Paths with Obstacles:", sol.uniquePathsWithObstacles(grid))  # 2
