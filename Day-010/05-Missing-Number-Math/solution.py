"""
Problem Name: Missing Number
Problem Statement: Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Approach: Gauss's Formula for sum of first n numbers (n * (n + 1) / 2) minus actual array sum.

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def missingNumber(nums: List[int]) -> int:
        n = len(nums)
        expected_sum = n * (n + 1) // 2
        actual_sum = sum(nums)
        return expected_sum - actual_sum

if __name__ == "__main__":
    nums1 = [3, 0, 1]
    print("Missing Number in [3, 0, 1]:", Solution.missingNumber(nums1))  # Expected: 2

    nums2 = [0, 1]
    print("Missing Number in [0, 1]:", Solution.missingNumber(nums2))  # Expected: 2
