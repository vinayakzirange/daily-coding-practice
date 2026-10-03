"""
Problem: Length of Last Word
Topic: Strings
Language: Python

Approach:
Scan string backwards, skipping trailing spaces, then count characters of last word.

Time Complexity: O(N)
Space Complexity: O(1)
"""

class Solution:
    @staticmethod
    def lengthOfLastWord(s: str) -> int:
        words = s.strip().split()
        return len(words[-1]) if words else 0

if __name__ == "__main__":
    print("Hello World ->", Solution.lengthOfLastWord("Hello World"))  # 5
    print("   fly me   to   the moon  ->", Solution.lengthOfLastWord("   fly me   to   the moon  "))  # 4
