"""
Problem: Longest Palindromic Substring (LeetCode 5)
Language: Python
Difficulty: Medium
Time Complexity: O(N^2)
Space Complexity: O(1)
"""

class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""

        def expand(left: int, right: int) -> int:
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return right - left - 1

        start, end = 0, 0
        for i in range(len(s)):
            len1 = expand(i, i)
            len2 = expand(i, i + 1)
            best = max(len1, len2)

            if best > end - start:
                start = i - (best - 1) // 2
                end = i + best // 2

        return s[start:end + 1]

if __name__ == "__main__":
    sol = Solution()
    print("Output ('babad'):", sol.longestPalindrome("babad"))  # "bab" or "aba"
    print("Output ('cbbd'):", sol.longestPalindrome("cbbd"))    # "bb"
