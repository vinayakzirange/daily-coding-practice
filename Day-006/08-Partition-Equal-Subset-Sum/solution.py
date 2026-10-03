"""
Problem Name: Partition Equal Subset Sum
Problem Statement: Given an integer array nums, return true if you can partition the array into two subsets
such that the sum of the elements in both subsets is equal.

Approach: 0-1 Knapsack Dynamic Programming. Check if a subset with sum = totalSum / 2 exists.

Time Complexity: O(N * Target) where Target = totalSum / 2
Space Complexity: O(Target) 1D DP Array
"""

from typing import List

class Solution:
    @staticmethod
    def canPartition(nums: List[int]) -> bool:
        total_sum = sum(nums)
        if total_sum % 2 != 0:
            return False

        target = total_sum // 2
        dp = [False] * (target + 1)
        dp[0] = True

        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]

        return dp[target]

if __name__ == "__main__":
    nums1 = [1, 5, 11, 5]
    print("Can partition [1, 5, 11, 5]:", Solution.canPartition(nums1))  # Expected: True

    nums2 = [1, 2, 3, 5]
    print("Can partition [1, 2, 3, 5]:", Solution.canPartition(nums2))  # Expected: False
