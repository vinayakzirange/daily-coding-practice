"""
Problem: Valid Palindrome II
Topic: Two Pointers / String
Language: Python

Approach:
Check characters from outside in. On first mismatch, test if deleting either left or right makes remainder a palindrome.

Time Complexity: O(N)
Space Complexity: O(1)
"""

class Solution:
    @staticmethod
    def validPalindrome(s: str) -> bool:
        def is_sub_pal(l: int, r: int) -> bool:
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                return is_sub_pal(left + 1, right) or is_sub_pal(left, right - 1)
            left += 1
            right -= 1

        return True

if __name__ == "__main__":
    print("aba ->", Solution.validPalindrome("aba"))    # True
    print("abca ->", Solution.validPalindrome("abca"))  # True
    print("abc ->", Solution.validPalindrome("abc"))    # False
