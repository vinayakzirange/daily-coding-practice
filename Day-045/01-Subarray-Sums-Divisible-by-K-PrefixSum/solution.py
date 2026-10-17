"""
Problem: Subarray Sums Divisible by K (LeetCode 974)
Difficulty: Medium
Topic: Array / Hash Table / Prefix Sum

Description:
Given an integer array nums and an integer k, return the number of non-empty
subarrays that have a sum divisible by k.

A subarray is a contiguous part of an array.

Example 1:
Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

Example 2:
Input: nums = [5], k = 9
Output: 0

Constraints:
- 1 <= nums.length <= 3 * 10^4
- -10^4 <= nums[i] <= 10^4
- 2 <= k <= 10^4

Complexity Analysis:
- Time Complexity: O(n) single pass through the array.
- Space Complexity: O(min(n, k)) to store remainders in a frequency map.
"""

from collections import defaultdict
from typing import List


class Solution:
    def subarraysDivByK(self, nums: List[int], k: int) -> int:
        # Map to store frequency of prefix sum remainders
        # Base case: prefix sum of 0 has remainder 0 once (empty prefix)
        remainder_count = defaultdict(int)
        remainder_count[0] = 1

        total_subarrays = 0
        current_sum = 0

        for num in nums:
            current_sum += num
            # In Python, the modulo operator '%' always produces a non-negative remainder
            rem = current_sum % k

            total_subarrays += remainder_count[rem]
            remainder_count[rem] += 1

        return total_subarrays


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([4, 5, 0, -2, -3, 1], 5, 7),
        ([5], 9, 0),
        ([5], 5, 1),
        ([0, 0, 0], 2, 6),  # 3 * 4 / 2 = 6
        ([-1, 2, 9], 2, 2),  # [2], [9 - 1 + 2 = 10]
        ([7, 4, -10], 5, 1),  # [4, -10] = -6 (no), [7, 4, -10] = 1 (no), [-10] = -10 (yes)
    ]

    for idx, (nums, k, expected) in enumerate(test_cases, 1):
        res = sol.subarraysDivByK(nums, k)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:5]}..., k={k} -> subarrays count = {res}")

    print("\nAll Subarray Sums Divisible by K tests passed successfully!")
