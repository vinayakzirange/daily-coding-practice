"""
Problem: Subarray Product Less Than K (LeetCode 713)
Difficulty: Medium
Topic: Array / Sliding Window / Two Pointers

Description:
Given an array of integers nums and an integer k, return the number of contiguous
subarrays where the product of all the elements in the subarray is strictly less than k.

Example 1:
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included since the product is 100 of which is not strictly less than k.

Example 2:
Input: nums = [1,2,3], k = 0
Output: 0

Constraints:
  * 1 <= nums.length <= 3 * 10^4
  * 1 <= nums[i] <= 1000
  * 0 <= k <= 10^6

Complexity:
  * Time Complexity: O(n) - Both pointers left and right move forward at most n times.
  * Space Complexity: O(1) - Constant auxiliary space.
"""

from typing import List


class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        # Since all elements are positive integers >= 1, product cannot be less than 1
        if k <= 1:
            return 0

        left = 0
        product = 1
        count = 0

        for right in range(len(nums)):
            product *= nums[right]

            # Shrink window until product is strictly less than k
            while product >= k and left <= right:
                product //= nums[left]
                left += 1

            # Number of valid contiguous subarrays ending at right is (right - left + 1)
            count += right - left + 1

        return count


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([10, 5, 2, 6], 100, 8),
        ([1, 2, 3], 0, 0),
        ([1, 1, 1], 1, 0),
        ([1, 2, 3, 4], 10, 7),
        ([57, 44, 92, 28, 66, 60, 37, 33, 52, 38, 29, 76, 8, 75, 22], 18, 1),
    ]

    for idx, (nums, k_val, expected) in enumerate(test_cases, 1):
        res = sol.numSubarrayProductLessThanK(nums, k_val)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:4]}..., k={k_val} -> valid subarrays = {res}")

    print("\nAll Subarray Product Less Than K tests passed successfully!")
