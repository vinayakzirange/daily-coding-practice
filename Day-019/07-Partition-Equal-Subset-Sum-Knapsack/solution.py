"""
Problem: Partition Equal Subset Sum
Topic: Dynamic Programming / 0-1 Knapsack Subsets
Language: Python

Approach:
Calculate total array sum. If sum is odd, return false. Target sum = sum / 2.
Reduce to 0-1 Knapsack: dp[i] is true if subset sum i can be formed.
Update 1D DP array backwards for each number in nums.

Time Complexity: O(N * Target)
Space Complexity: O(Target)
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
            for i in range(target, num - 1, -1):
                dp[i] = dp[i] or dp[i - num]

        return dp[target]

if __name__ == "__main__":
    print("[1, 5, 11, 5] ->", Solution.canPartition([1, 5, 11, 5]))  # True
    print("[1, 2, 3, 5] ->", Solution.canPartition([1, 2, 3, 5]))    # False
