"""
Problem: Contains Duplicate
Topic: Arrays / Hashing
Language: Python

Approach:
Use a set to track visited elements. Return True if seen already, else add to set.

Time Complexity: O(N)
Space Complexity: O(N)
"""

from typing import List

class Solution:
    @staticmethod
    def containsDuplicate(nums: List[int]) -> bool:
        return len(set(nums)) < len(nums)

if __name__ == "__main__":
    print("[1,2,3,1] ->", Solution.containsDuplicate([1, 2, 3, 1]))  # True
    print("[1,2,3,4] ->", Solution.containsDuplicate([1, 2, 3, 4]))  # False
