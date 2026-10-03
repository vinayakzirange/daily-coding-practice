"""
Problem: Word Break
Topic: Dynamic Programming / HashSet
Language: Python

Approach:
dp[i] is true if substring s[0...i-1] can be segmented into dictionary words.
For each i, check all j < i if dp[j] is true AND wordDict contains s[j...i-1].

Time Complexity: O(N^2 * L) where L is max word length
Space Complexity: O(N)
"""

from typing import List

class Solution:
    @staticmethod
    def wordBreak(s: str, wordDict: List[str]) -> bool:
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
    s = "leetcode"
    words = ["leet", "code"]
    print("leetcode ->", Solution.wordBreak(s, words))  # True
