"""
Problem Name: Maximum Subarray (Kadane's Algorithm)
Problem Statement: Given an integer array nums, find the contiguous subarray (containing at least one number)
which has the largest sum and return its sum.

Approach: Dynamic Programming / Kadane's Algorithm.
At each index, decide whether to extend the current subarray sum or start fresh from current element.

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def maxSubArray(nums: List[int]) -> int:
        max_so_far = nums[0]
        current_max = nums[0]

        for i in range(1, len(nums)):
            current_max = max(nums[i], current_max + nums[i])
            max_so_far = max(max_so_far, current_max)

        return max_so_far

if __name__ == "__main__":
    nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    print("Maximum Subarray Sum:", Solution.maxSubArray(nums))  # Expected: 6
