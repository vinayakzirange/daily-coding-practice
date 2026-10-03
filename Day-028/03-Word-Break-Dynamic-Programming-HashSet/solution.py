"""
Problem: Word Break (LeetCode 139)
Language: Python
Difficulty: Medium
Time Complexity: O(N^2 * L) where L is max word length
Space Complexity: O(N)
"""

from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True

        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break

        return dp[len(s)]

if __name__ == "__main__":
    sol = Solution()
    print("Output ('leetcode'):", sol.wordBreak("leetcode", ["leet", "code"]))  # True
    print("Output ('applepenapple'):", sol.wordBreak("applepenapple", ["apple", "pen"]))  # True
