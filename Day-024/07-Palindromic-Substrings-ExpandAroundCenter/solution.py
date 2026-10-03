"""
Problem: Palindromic Substrings (LeetCode 647)
Language: Python
Difficulty: Medium
Time Complexity: O(N^2)
Space Complexity: O(1)
"""

class Solution:
    def __init__(self):
        self.count = 0

    def countSubstrings(self, s: str) -> int:
        self.count = 0
        if not s:
            return 0

        for i in range(len(s)):
            self.expand(s, i, i)      # Odd length
            self.expand(s, i, i + 1)  # Even length

        return self.count

    def expand(self, s: str, left: int, right: int) -> None:
        while left >= 0 and right < len(s) and s[left] == s[right]:
            self.count += 1
            left -= 1
            right += 1

if __name__ == "__main__":
    sol = Solution()
    print("Output ('abc'):", sol.countSubstrings("abc"))  # 3
    sol2 = Solution()
    print("Output ('aaa'):", sol2.countSubstrings("aaa"))  # 6
