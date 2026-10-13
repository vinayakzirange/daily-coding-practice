"""
Problem: Letter Combinations of a Phone Number (LeetCode 17)
Difficulty: Medium
Topic: Hash Table / String / Backtracking / Combinations

Description:
Given a string containing digits from 2-9 inclusive, return all possible letter
combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below.
Note that 1 does not map to any letters.

2 -> "abc"
3 -> "def"
4 -> "ghi"
5 -> "jkl"
6 -> "mno"
7 -> "pqrs"
8 -> "tuv"
9 -> "wxyz"

Example 1:
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2:
Input: digits = ""
Output: []

Example 3:
Input: digits = "2"
Output: ["a","b","c"]

Constraints:
- 0 <= digits.length <= 4
- digits[i] is a digit in the range ['2', '9'].

Complexity Analysis:
- Time Complexity: O(4^n * n) where n is digits length (each digit maps to 3 or 4 letters).
- Space Complexity: O(n) recursion depth for call stack.
"""

from typing import List


class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        phone_map = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        result = []
        n = len(digits)

        def backtrack(index: int, current_path: List[str]):
            if index == n:
                result.append("".join(current_path))
                return

            letters = phone_map[digits[index]]
            for char in letters:
                current_path.append(char)
                backtrack(index + 1, current_path)
                current_path.pop()

        backtrack(0, [])
        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ("23", ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]),
        ("", []),
        ("2", ["a", "b", "c"]),
        ("7", ["p", "q", "r", "s"]),
        (
            "234",
            [
                "adg",
                "adh",
                "adi",
                "aeg",
                "aeh",
                "aei",
                "afg",
                "afh",
                "afi",
                "bdg",
                "bdh",
                "bdi",
                "beg",
                "beh",
                "bei",
                "bfg",
                "bfh",
                "bfi",
                "cdg",
                "cdh",
                "cdi",
                "ceg",
                "ceh",
                "cei",
                "cfg",
                "cfh",
                "cfi",
            ],
        ),
    ]

    for idx, (digits, expected) in enumerate(test_cases, 1):
        res = sol.letterCombinations(digits)
        assert sorted(res) == sorted(
            expected
        ), f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: digits='{digits}' -> {len(res)} combinations generated")

    print("\nAll Letter Combinations tests passed successfully!")
