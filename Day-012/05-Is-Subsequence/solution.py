"""
Problem: Is Subsequence
Topic: Two Pointers
Language: Python

Approach:
Use two pointers: i for string s, j for string t. Advance j on every step,
advance i when s[i] == t[j]. Return true if i == len(s).

Time Complexity: O(N) where N is length of t
Space Complexity: O(1)
"""

class Solution:
    @staticmethod
    def isSubsequence(s: str, t: str) -> bool:
        i, j = 0, 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)

if __name__ == "__main__":
    print("abc, ahbgdc ->", Solution.isSubsequence("abc", "ahbgdc"))  # True
    print("axc, ahbgdc ->", Solution.isSubsequence("axc", "ahbgdc"))  # False
