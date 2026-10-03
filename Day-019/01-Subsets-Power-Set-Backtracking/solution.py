"""
Problem: Subsets (Power Set)
Topic: Backtracking / Combinatorics
Language: Python

Approach:
Explore all subsets recursively. At each recursion depth, add current subset copy to result.
Iterate from 'start' index to n-1, include nums[i], recurse with (i + 1), then backtrack.

Time Complexity: O(N * 2^N)
Space Complexity: O(N) recursion stack
"""

from typing import List

class Solution:
    @staticmethod
    def subsets(nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(start: int, current: List[int]):
            result.append(list(current))
            for i in range(start, len(nums)):
                current.append(nums[i])
                backtrack(i + 1, current)
                current.pop()

        backtrack(0, [])
        return result

if __name__ == "__main__":
    print("Subsets of [1,2,3] ->", Solution.subsets([1, 2, 3]))
