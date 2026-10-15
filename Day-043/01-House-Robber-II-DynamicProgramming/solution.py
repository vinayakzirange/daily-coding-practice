"""
Problem: House Robber II (LeetCode 213)
Difficulty: Medium
Topic: Array / Dynamic Programming

Description:
You are a professional robber planning to rob houses along a street. Each house
has a certain amount of money stashed. All houses at this place are arranged in
a circle. That means the first house is the neighbor of the last one. Meanwhile,
adjacent houses have a security system connected, and it will automatically
contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house,
return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
because they are adjacent houses.

Example 2:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Example 3:
Input: nums = [1,2,3]
Output: 3

Constraints:
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 1000

Complexity Analysis:
- Time Complexity: O(n) running two linear House Robber passes.
- Space Complexity: O(1) constant auxiliary space with two state variables.
"""

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]

        def rob_linear(houses: List[int]) -> int:
            prev2 = 0
            prev1 = 0
            for money in houses:
                curr = max(prev1, prev2 + money)
                prev2 = prev1
                prev1 = curr
            return prev1

        # Circle breaks into two linear scenarios:
        # 1) Exclude last house: nums[0 : n-1]
        # 2) Exclude first house: nums[1 : n]
        return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([2, 3, 2], 3),
        ([1, 2, 3, 1], 4),
        ([1, 2, 3], 3),
        ([5], 5),
        ([200, 3, 140, 20, 10], 340),  # 200 + 140
        ([1, 3, 1, 3, 100], 103),  # 3 + 100
        ([0, 0, 0], 0),
    ]

    for idx, (nums, expected) in enumerate(test_cases, 1):
        res = sol.rob(nums)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums} -> max rob = {res}")

    print("\nAll House Robber II tests passed successfully!")
