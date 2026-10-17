"""
Problem: Continuous Subarray Sum (LeetCode 523)
Difficulty: Medium
Topic: Array / Hash Table / Math / Prefix Sum

Description:
Given an integer array nums and an integer k, return true if nums has a good
subarray or false otherwise.

A good subarray is a subarray where:
- its length is at least two, and
- the sum of the elements of the subarray is a multiple of k.

Note that:
- A subarray is a contiguous part of the array.
- An integer x is a multiple of k if there exists an integer n such that
  x = n * k. 0 is always a multiple of k.

Example 1:
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.

Example 2:
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.

Example 3:
Input: nums = [23,2,6,4,7], k = 13
Output: false

Constraints:
- 1 <= nums.length <= 10^5
- 0 <= nums[i] <= 10^9
- 0 <= sum(nums[i]) <= 2^31 - 1
- 1 <= k <= 2^31 - 1

Complexity Analysis:
- Time Complexity: O(n) single pass through the array.
- Space Complexity: O(min(n, k)) storing remainder to earliest index mappings.
"""

from typing import List


class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        # Maps remainder of prefix sum to the EARLIEST index it was seen at
        # Base case: remainder 0 seen at index -1 (handles subarrays starting at index 0)
        remainder_map = {0: -1}
        running_sum = 0

        for i, num in enumerate(nums):
            running_sum += num
            rem = running_sum % k

            if rem in remainder_map:
                # Subarray length must be at least 2
                if i - remainder_map[rem] >= 2:
                    return True
            else:
                # Only record the earliest index to maximize the subarray length
                remainder_map[rem] = i

        return False


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([23, 2, 4, 6, 7], 6, True),
        ([23, 2, 6, 4, 7], 6, True),
        ([23, 2, 6, 4, 7], 13, False),
        ([23, 0, 0], 6, True),  # [0, 0] has sum 0 = 0 * 6
        ([5, 0, 0, 0], 3, True),
        ([0], 1, False),  # Length 1 is invalid
        ([1, 0], 2, False),
    ]

    for idx, (nums, k, expected) in enumerate(test_cases, 1):
        res = sol.checkSubarraySum(nums, k)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:5]}..., k={k} -> hasSubarray = {res}")

    print("\nAll Continuous Subarray Sum tests passed successfully!")
