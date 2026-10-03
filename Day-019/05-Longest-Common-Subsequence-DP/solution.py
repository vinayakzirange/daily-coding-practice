"""
Problem: Longest Common Subsequence (LCS)
Topic: 2D Dynamic Programming / String Matching
Language: Python

Approach:
Build 2D DP table dp[i][j] representing LCS of text1[0...i-1] and text2[0...j-1].
If characters match: dp[i][j] = 1 + dp[i-1][j-1].
Otherwise: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).

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
    print("LCS ('abcde', 'ace') ->", Solution.longestCommonSubsequence("abcde", "ace"))  # 3 ("ace")
    print("LCS ('abc', 'abc') ->", Solution.longestCommonSubsequence("abc", "abc"))      # 3
    print("LCS ('abc', 'def') ->", Solution.longestCommonSubsequence("abc", "def"))      # 0
