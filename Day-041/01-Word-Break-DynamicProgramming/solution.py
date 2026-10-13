"""
Problem: Word Break (LeetCode 139)
Difficulty: Medium
Topic: String / Dynamic Programming / Hash Set / Memoization

Description:
Given a string s and a dictionary of strings wordDict, return true if s can
be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the
segmentation.

Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

Constraints:
- 1 <= s.length <= 300
- 1 <= wordDict.length <= 1000
- 1 <= wordDict[i].length <= 20
- s and wordDict[i] consist of only lowercase English letters.
- All the strings of wordDict are unique.

Complexity Analysis:
- Time Complexity: O(n * m * k) where n is length of s, m is max word length, and k is string slicing time.
- Space Complexity: O(n + d) where d is words stored in the hash set and n is dp array size.
"""

from typing import List


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        n = len(s)
        max_word_len = max(len(w) for w in word_set) if word_set else 0

        # dp[i] is True if prefix s[0:i] can be segmented using wordDict
        dp = [False] * (n + 1)
        dp[0] = True  # Base case: empty string prefix is valid

        for i in range(1, n + 1):
            # Only need to look back up to max_word_len characters
            for j in range(max(0, i - max_word_len), i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break

        return dp[n]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ("leetcode", ["leet", "code"], True),
        ("applepenapple", ["apple", "pen"], True),
        ("catsandog", ["cats", "dog", "sand", "and", "cat"], False),
        ("a", ["b"], False),
        ("a", ["a"], True),
        ("cars", ["car", "ca", "rs"], True),
        (
            "goalspecial",
            ["go", "goal", "goals", "special"],
            True,
        ),
    ]

    for idx, (s, wordDict, expected) in enumerate(test_cases, 1):
        res = sol.wordBreak(s, wordDict)
        assert res == expected, f"Test {idx} Failed: s='{s}', got {res}, expected {expected}"
        print(f"Test {idx} Passed: s='{s}', dict_size={len(wordDict)} -> canSegment = {res}")

    print("\nAll Word Break tests passed successfully!")
