"""
Problem: Valid Anagram
Topic: Strings / Hashing
Language: Python

Approach:
Count frequencies of each character using a frequency array or hash map.
Both strings must have identical lengths and character counts.

Time Complexity: O(N)
Space Complexity: O(1) for fixed alphabet
"""

from collections import Counter

class Solution:
    @staticmethod
    def isAnagram(s: str, t: str) -> bool:
        return Counter(s) == Counter(t)

if __name__ == "__main__":
    print("anagram, nagaram ->", Solution.isAnagram("anagram", "nagaram"))  # True
    print("rat, car ->", Solution.isAnagram("rat", "car"))                  # False
