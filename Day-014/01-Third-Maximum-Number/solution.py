"""
Problem: Third Maximum Number
Topic: Array / Set / Linear Scan
Language: Python

Approach:
Maintain three distinct maximum variables (first, second, third) initialized to None.
Iterate through the array updating the three variables. If third max exists, return it;
otherwise return the first max.

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def thirdMax(nums: List[int]) -> int:
        first, second, third = None, None, None

        for n in nums:
            if n in (first, second, third):
                continue
            if first is None or n > first:
                first, second, third = n, first, second
            elif second is None or n > second:
                second, third = n, second
            elif third is None or n > third:
                third = n

        return third if third is not None else first

if __name__ == "__main__":
    print("Third Max [3, 2, 1] ->", Solution.thirdMax([3, 2, 1]))        # 1
    print("Third Max [1, 2] ->", Solution.thirdMax([1, 2]))              # 2
    print("Third Max [2, 2, 3, 1] ->", Solution.thirdMax([2, 2, 3, 1]))  # 1
