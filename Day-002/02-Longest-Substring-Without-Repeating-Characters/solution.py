"""
Problem Name: Longest Substring Without Repeating Characters
Problem Statement: Given a string s, find the length of the longest substring without repeating characters.

Approach: Sliding Window technique using a dictionary to store the last seen index of each character.

Time Complexity: O(N) - Linear pass through string
Space Complexity: O(min(N, M)) where M is alphabet size (O(1) for fixed character set)
"""

class Solution:
    @staticmethod
    def lengthOfLongestSubstring(s: str) -> int:
        char_map = {}
        max_length = 0
        left = 0

        for right, ch in enumerate(s):
            if ch in char_map:
                left = max(left, char_map[ch] + 1)
            char_map[ch] = right
            max_length = max(max_length, right - left + 1)

        return max_length

if __name__ == "__main__":
    s = "abcabcbb"
    print("Longest Substring Length:", Solution.lengthOfLongestSubstring(s))  # Expected: 3 ("abc")
