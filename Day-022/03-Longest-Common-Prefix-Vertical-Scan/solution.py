"""
Problem: Longest Common Prefix
Topic: String / Vertical Scanning / Trie
Language: Python

Approach:
Compare character by character at column index i across all strings.
Stop and return substring s[0...i-1] as soon as mismatch or string end is reached.

Time Complexity: O(S) where S is total sum of characters
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def longestCommonPrefix(strs: List[str]) -> str:
        if not strs:
            return ""

        for i in range(len(strs[0])):
            c = strs[0][i]
            for j in range(1, len(strs)):
                if i == len(strs[j]) or strs[j][i] != c:
                    return strs[0][:i]

        return strs[0]

if __name__ == "__main__":
    strs1 = ["flower", "flow", "flight"]
    print("Common Prefix ->", Solution.longestCommonPrefix(strs1))  # "fl"

    strs2 = ["dog", "racecar", "car"]
    print("Common Prefix ->", Solution.longestCommonPrefix(strs2))  # ""
