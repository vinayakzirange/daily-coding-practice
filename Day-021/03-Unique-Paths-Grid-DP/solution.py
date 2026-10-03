"""
Problem: Unique Paths
Topic: 2D Dynamic Programming / Grid Combinatorics
Language: Python

Approach:
Define dp[i][j] as unique paths to reach cell (i, j).
Recurrence: dp[i][j] = dp[i-1][j] + dp[i][j-1].
Optimize to 1D DP array of size n.

Time Complexity: O(M * N)
Space Complexity: O(N)
"""

class Solution:
    @staticmethod
    def uniquePaths(m: int, n: int) -> int:
        dp = [1] * n

        for _ in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]

        return dp[n - 1]

if __name__ == "__main__":
    print("m=3, n=7 ->", Solution.uniquePaths(3, 7))  # 28
    print("m=3, n=2 ->", Solution.uniquePaths(3, 2))  # 3
