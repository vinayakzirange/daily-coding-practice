"""
Problem: Palindrome Partitioning
Topic: Backtracking / String Partitioning
Language: Python

Approach:
Use recursive backtracking starting from index 0. At each step, test if substring s[start...i]
is a valid palindrome. If true, append to path and backtrack on s[i+1...n-1].

Time Complexity: O(N * 2^N)
Space Complexity: O(N) recursion stack
"""

from typing import List

class Solution:
    @staticmethod
    def partition(s: str) -> List[List[str]]:
        result = []

        def is_palindrome(sub: str) -> bool:
            return sub == sub[::-1]

        def backtrack(start: int, current: List[str]):
            if start == len(s):
                result.append(list(current))
                return

            for i in range(start, len(s)):
                sub = s[start:i + 1]
                if is_palindrome(sub):
                    current.append(sub)
                    backtrack(i + 1, current)
                    current.pop()

        backtrack(0, [])
        return result

if __name__ == "__main__":
    print("Partition 'aab' ->", Solution.partition("aab"))  # [["a","a","b"], ["aa","b"]]
