"""
Problem Name: Longest Increasing Subsequence (LIS)
Problem Statement: Given an integer array nums, return the length of the longest strictly increasing subsequence.

Approach: Dynamic Programming. dp[i] represents length of LIS ending at index i.

Time Complexity: O(N^2)
Space Complexity: O(N)
"""

from typing import List

class Solution:
    @staticmethod
    def lengthOfLIS(nums: List[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        dp = [1] * n

        max_lis = 1
        for i in range(1, n):
            for j in range(i):
                if nums[i] > nums[j]:
                    dp[i] = max(dp[i], dp[j] + 1)
            max_lis = max(max_lis, dp[i])

        return max_lis

if __name__ == "__main__":
    nums = [10, 9, 2, 5, 3, 7, 101, 18]
    print("LIS Length:", Solution.lengthOfLIS(nums))  # Expected: 4
