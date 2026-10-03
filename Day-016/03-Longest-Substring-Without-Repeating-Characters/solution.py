"""
Problem: Longest Substring Without Repeating Characters
Topic: Sliding Window / HashMap
Language: Python

Approach:
Use sliding window [left, right] and a Map storing character index.
When encountering a duplicate character inside window bounds, shift 'left' to map.get(char) + 1.
Track max window length.

Time Complexity: O(N)
Space Complexity: O(min(N, M))
"""

class Solution:
    @staticmethod
    def lengthOfLongestSubstring(s: str) -> int:
        char_map = {}
        max_len = 0
        left = 0

        for right, c in enumerate(s):
            if c in char_map:
                left = max(left, char_map[c] + 1)
            char_map[c] = right
            max_len = max(max_len, right - left + 1)

        return max_len

if __name__ == "__main__":
    print("abcabcbb ->", Solution.lengthOfLongestSubstring("abcabcbb"))  # 3 ("abc")
    print("bbbbb ->", Solution.lengthOfLongestSubstring("bbbbb"))        # 1 ("b")
    print("pwwkew ->", Solution.lengthOfLongestSubstring("pwwkew"))      # 3 ("wke")
