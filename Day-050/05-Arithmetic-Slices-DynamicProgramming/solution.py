"""
====================================================================
Problem: Arithmetic Slices (LeetCode 413)
Difficulty: Medium
Topic: Array, Dynamic Programming
====================================================================

An integer array is called arithmetic if it consists of at least three
elements and if the difference between any two consecutive elements
is the same.

For example, [1,3,5,7,9], [7,7,7,7], and [3,-1,-5,-9] are arithmetic
sequences.

Given an integer array nums, return the number of arithmetic subarrays
of nums.

A subarray is a contiguous subsequence of the array.

Example 1:
Input: nums = [1,2,3,4]
Output: 3
Explanation: We have 3 arithmetic slices in nums: [1, 2, 3], [2, 3, 4]
and [1,2,3,4] itself.

Example 2:
Input: nums = [1]
Output: 0

Constraints:
- 1 <= nums.length <= 5000
- -1000 <= nums[i] <= 1000
====================================================================
"""

from typing import List

class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        """
        Dynamic Programming / Running Consecutive Count:
        If nums[i] - nums[i-1] == nums[i-1] - nums[i-2], the number of
        arithmetic slices ending at index i is current_count + 1.
        We accumulate current_count into total.

        Time Complexity: O(n) single pass
        Space Complexity: O(1) auxiliary variables
        """
        if len(nums) < 3:
            return 0

        total_slices = 0
        current_streak = 0

        for i in range(2, len(nums)):
            if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
                current_streak += 1
                total_slices += current_streak
            else:
                current_streak = 0

        return total_slices


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [1, 2, 3, 4] -> 3
    assert solver.numberOfArithmeticSlices([1, 2, 3, 4]) == 3, "Test 1 failed"
    print("Test 1 Passed: [1, 2, 3, 4] -> 3")

    # Test 2: [1] -> 0
    assert solver.numberOfArithmeticSlices([1]) == 0, "Test 2 failed"
    print("Test 2 Passed: [1] -> 0")

    # Test 3: [1, 2, 3, 4, 5] -> 6
    # [1,2,3], [2,3,4], [3,4,5], [1,2,3,4], [2,3,4,5], [1,2,3,4,5]
    assert solver.numberOfArithmeticSlices([1, 2, 3, 4, 5]) == 6, "Test 3 failed"
    print("Test 3 Passed: [1, 2, 3, 4, 5] -> 6")

    # Test 4: Constant sequence [7, 7, 7, 7] -> 3
    assert solver.numberOfArithmeticSlices([7, 7, 7, 7]) == 3, "Test 4 failed"
    print("Test 4 Passed: [7, 7, 7, 7] -> 3")

    # Test 5: No arithmetic slice: [1, 1, 2, 5, 7] -> 0
    assert solver.numberOfArithmeticSlices([1, 1, 2, 5, 7]) == 0, "Test 5 failed"
    print("Test 5 Passed: [1, 1, 2, 5, 7] -> 0")

    # Test 6: Multiple independent segments: [1, 2, 3, 10, 12, 14] -> 2
    assert solver.numberOfArithmeticSlices([1, 2, 3, 10, 12, 14]) == 2, "Test 6 failed"
    print("Test 6 Passed: [1, 2, 3, 10, 12, 14] -> 2")

    print("\nAll Arithmetic Slices tests passed successfully!")
