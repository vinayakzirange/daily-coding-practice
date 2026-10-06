"""
Problem: Find First and Last Position of Element in Sorted Array (LeetCode 34)
Difficulty: Medium
Topic: Array / Binary Search / Lower Bound & Upper Bound

Description:
Given an array of integers nums sorted in non-decreasing order, find the starting
and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:
Input: nums = [], target = 0
Output: [-1,-1]

Constraints:
  * 0 <= nums.length <= 10^5
  * -10^9 <= nums[i] <= 10^9
  * nums is a non-decreasing array.
  * -10^9 <= target <= 10^9

Complexity:
  * Time Complexity: O(log n) - Two binary search passes.
  * Space Complexity: O(1) - Constant auxiliary space.
"""

from typing import List


class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def find_bound(is_first: bool) -> int:
            left, right = 0, len(nums) - 1
            bound = -1

            while left <= right:
                mid = left + (right - left) // 2
                if nums[mid] == target:
                    bound = mid
                    if is_first:
                        # Continue searching towards left to find first occurrence
                        right = mid - 1
                    else:
                        # Continue searching towards right to find last occurrence
                        left = mid + 1
                elif nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1

            return bound

        start = find_bound(True)
        if start == -1:
            return [-1, -1]
        end = find_bound(False)

        return [start, end]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([5, 7, 7, 8, 8, 10], 8, [3, 4]),
        ([5, 7, 7, 8, 8, 10], 6, [-1, -1]),
        ([], 0, [-1, -1]),
        ([1], 1, [0, 0]),
        ([2, 2], 2, [0, 1]),
        ([1, 2, 3, 3, 3, 3, 4, 5], 3, [2, 5]),
    ]

    for idx, (nums, target, expected) in enumerate(test_cases, 1):
        result = sol.searchRange(nums, target)
        assert result == expected, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:5]}..., target={target} -> range = {result}")

    print("\nAll Find First and Last Position tests passed successfully!")
