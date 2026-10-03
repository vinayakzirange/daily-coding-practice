"""
Problem Name: Longest Common Subsequence
Problem Statement: Given two strings text1 and text2, return the length of their longest common subsequence.
If there is no common subsequence, return 0.

Approach: 2D Dynamic Programming.
dp[i][j] = 1 + dp[i-1][j-1] if text1[i-1] == text2[j-1], else max(dp[i-1][j], dp[i][j-1]).

Time Complexity: O(M * N)
Space Complexity: O(M * N)
"""

class Solution:
    @staticmethod
    def longestCommonSubsequence(text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        return dp[m][n]

if __name__ == "__main__":
    text1 = "abcde"
    text2 = "ace"
    print("LCS Length:", Solution.longestCommonSubsequence(text1, text2))  # Expected: 3 ("ace")
