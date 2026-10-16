"""
Problem: Palindrome Partitioning (LeetCode 131)
Difficulty: Medium
Topic: String / Dynamic Programming / Backtracking

Description:
Given a string s, partition s such that every substring of the partition is a
palindrome. Return all possible palindrome partitioning of s.

A palindrome string is a string that reads the same backward as forward.

Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Example 2:
Input: s = "a"
Output: [["a"]]

Constraints:
- 1 <= s.length <= 16
- s contains only lowercase English letters.

Complexity Analysis:
- Time Complexity: O(N * 2^N) where N is the length of string s. There are 2^(N-1) possible partitions, and palindrome check takes O(N).
- Space Complexity: O(N) recursion stack and current path storage.
"""

from typing import List


class Solution:
    def partition(self, s: str) -> List[List[str]]:
        result = []
        n = len(s)

        def is_palindrome(sub: str) -> bool:
            return sub == sub[::-1]

        def backtrack(start: int, path: List[str]):
            if start == n:
                result.append(list(path))
                return

            for end in range(start + 1, n + 1):
                substring = s[start:end]
                if is_palindrome(substring):
                    path.append(substring)
                    backtrack(end, path)
                    path.pop()

        backtrack(0, [])
        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ("aab", [["a", "a", "b"], ["aa", "b"]]),
        ("a", [["a"]]),
        (
            "efe",
            [["e", "f", "e"], ["efe"]],
        ),
        (
            "racecar",
            [
                ["r", "a", "c", "e", "c", "a", "r"],
                ["r", "a", "cec", "a", "r"],
                ["r", "aceca", "r"],
                ["racecar"],
            ],
        ),
    ]

    for idx, (s, expected) in enumerate(test_cases, 1):
        res = sol.partition(s)
        sorted_res = sorted([sorted(p) for p in res])
        sorted_exp = sorted([sorted(p) for p in expected])
        assert (
            sorted_res == sorted_exp
        ), f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: s='{s}' -> {len(res)} partitions found")

    print("\nAll Palindrome Partitioning tests passed successfully!")
