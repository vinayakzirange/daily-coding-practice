"""
Problem: Next Permutation
Topic: Array / Two Pointers / Lexicographical Order
Language: Python

Approach:
1. Find the first decreasing element from right (pivot i where nums[i] < nums[i+1]).
2. Find the smallest element greater than nums[i] to its right and swap them.
3. Reverse the subarray to the right of pivot i to get the next lexicographical permutation.

Time Complexity: O(N)
Space Complexity: O(1) in-place
"""

from typing import List

class Solution:
    @staticmethod
    def nextPermutation(nums: List[int]) -> None:
        n = len(nums)
        i = n - 2

        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1

        if i >= 0:
            j = n - 1
            while j >= 0 and nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]

        nums[i + 1:] = reversed(nums[i + 1:])

if __name__ == "__main__":
    nums = [1, 2, 3]
    Solution.nextPermutation(nums)
    print("Next Permutation [1,2,3] ->", nums)  # [1, 3, 2]
