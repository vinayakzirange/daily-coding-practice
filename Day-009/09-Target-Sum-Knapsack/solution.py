"""
Problem Name: Target Sum
Problem Statement: You are given an integer array nums and an integer target.
You want to build an expression by adding '+' or '-' before each integer. Return the number of ways to assign symbols to make the sum equal to target.

Approach: Reduce to Subset Sum problem. Let P be positive subset and N be negative subset.
P - N = target and P + N = totalSum => 2 * P = target + totalSum => P = (target + totalSum) / 2.

Time Complexity: O(N * SubsetSum)
Space Complexity: O(SubsetSum)
"""

from typing import List

class Solution:
    @staticmethod
    def findTargetSumWays(nums: List[int], target: int) -> int:
        total_sum = sum(nums)
        if abs(target) > total_sum or (target + total_sum) % 2 != 0:
            return 0

        subset_sum = (target + total_sum) // 2
        if subset_sum < 0:
            return 0

        dp = [0] * (subset_sum + 1)
        dp[0] = 1

        for num in nums:
            for j in range(subset_sum, num - 1, -1):
                dp[j] += dp[j - num]

        return dp[subset_sum]

if __name__ == "__main__":
    nums = [1, 1, 1, 1, 1]
    target = 3
    print("Ways to target 3:", Solution.findTargetSumWays(nums, target))  # Expected: 5
