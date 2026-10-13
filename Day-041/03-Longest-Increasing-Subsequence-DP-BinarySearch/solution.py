"""
Problem: Longest Increasing Subsequence (LeetCode 300)
Difficulty: Medium
Topic: Array / Binary Search / Dynamic Programming / Patience Sorting

Description:
Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1

Constraints:
- 1 <= nums.length <= 2500
- -10^4 <= nums[i] <= 10^4

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

Complexity Analysis:
- Time Complexity: O(n log n) using patience sorting and binary search (bisect_left).
- Space Complexity: O(n) to store the tails array.
"""

from bisect import bisect_left
from typing import List


class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        if not nums:
            return 0

        # tails[i] stores the smallest tail of all increasing subsequences of length i + 1
        tails = []

        for x in nums:
            idx = bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x

        return len(tails)

    def lengthOfLIS_DP(self, nums: List[int]) -> int:
        """O(n^2) classical Dynamic Programming approach for comparison."""
        if not nums:
            return 0
        n = len(nums)
        dp = [1] * n
        for i in range(1, n):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([10, 9, 2, 5, 3, 7, 101, 18], 4),
        ([0, 1, 0, 3, 2, 3], 4),
        ([7, 7, 7, 7, 7, 7, 7], 1),
        ([4, 10, 4, 3, 8, 9], 3),
        ([1, 3, 6, 7, 9, 4, 10, 5, 6], 6),
        ([5], 1),
        ([10, 22, 9, 33, 21, 50, 41, 60, 80], 6),
    ]

    for idx, (nums, expected) in enumerate(test_cases, 1):
        res_fast = sol.lengthOfLIS(nums)
        res_dp = sol.lengthOfLIS_DP(nums)
        assert (
            res_fast == expected
        ), f"Test {idx} (BinarySearch) Failed: got {res_fast}, expected {expected}"
        assert (
            res_dp == expected
        ), f"Test {idx} (DP) Failed: got {res_dp}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:6]}... -> LIS length = {res_fast}")

    print("\nAll Longest Increasing Subsequence tests passed successfully!")
