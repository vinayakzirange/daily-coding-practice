"""
Problem: House Robber (LeetCode 198)
Difficulty: Medium
Topic: Array / Dynamic Programming

Description:
You are a professional robber planning to rob houses along a street. Each house
has a certain amount of money stashed, the only constraint stopping you from
robbing each of them is that adjacent houses have security systems connected
and it will automatically contact the police if two adjacent houses were broken
into on the same night.

Given an integer array nums representing the amount of money of each house,
return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.

Constraints:
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 400

Complexity Analysis:
- Time Complexity: O(n) single pass through the list.
- Space Complexity: O(1) constant auxiliary space using two variables.
"""

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0

        prev2 = 0  # Max loot up to i - 2
        prev1 = 0  # Max loot up to i - 1

        for money in nums:
            curr = max(prev1, prev2 + money)
            prev2 = prev1
            prev1 = curr

        return prev1


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([1, 2, 3, 1], 4),
        ([2, 7, 9, 3, 1], 12),
        ([0], 0),
        ([5], 5),
        ([2, 1, 1, 2], 4),
        ([10, 1, 1, 10], 20),
        ([4, 1, 2, 7, 5, 3, 1], 14),  # 4 + 7 + 3 = 14
    ]

    for idx, (nums, expected) in enumerate(test_cases, 1):
        res = sol.rob(nums)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums} -> max loot = {res}")

    print("\nAll House Robber tests passed successfully!")
