"""
Problem: Target Sum (LeetCode 494)
Difficulty: Medium
Topic: Array / Dynamic Programming / Backtracking / 0-1 Knapsack

Description:
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-'
before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and
concatenate them to build the expression "+2-1 = 1".

Return the number of different expressions that you can build, which evaluates to target.

Example 1:
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

Example 2:
Input: nums = [1], target = 1
Output: 1

Constraints:
- 1 <= nums.length <= 20
- 0 <= nums[i] <= 1000
- 0 <= sum(nums[i]) <= 1000
- -1000 <= target <= 1000

Complexity Analysis:
- Time Complexity: O(n * s) where s = (sum(nums) + target) / 2.
- Space Complexity: O(s) for the 1D DP table.
"""

from typing import List


class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total_sum = sum(nums)

        # Let P be subset with positive signs and N be subset with negative signs:
        # sum(P) - sum(N) = target
        # sum(P) + sum(N) = total_sum
        # 2 * sum(P) = target + total_sum  =>  sum(P) = (target + total_sum) / 2
        if (total_sum + target) % 2 != 0 or abs(target) > total_sum:
            return 0

        subset_sum = (total_sum + target) // 2

        # dp[j] = number of subsets of nums that sum to j
        dp = [0] * (subset_sum + 1)
        dp[0] = 1  # 1 way to form sum 0 (empty subset)

        for num in nums:
            for j in range(subset_sum, num - 1, -1):
                dp[j] += dp[j - num]

        return dp[subset_sum]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([1, 1, 1, 1, 1], 3, 5),
        ([1], 1, 1),
        ([1], 2, 0),
        ([0, 0, 0, 0, 0, 0, 0, 0, 1], 1, 256),  # 2^8 = 256 ways to assign +/- to 0s
        ([2, 1], 1, 1),
        ([1, 2, 3, 4, 5], 3, 3),
        ([1000], -1000, 1),
    ]

    for idx, (nums, target, expected) in enumerate(test_cases, 1):
        res = sol.findTargetSumWays(nums, target)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:5]}..., target={target} -> ways = {res}")

    print("\nAll Target Sum tests passed successfully!")
