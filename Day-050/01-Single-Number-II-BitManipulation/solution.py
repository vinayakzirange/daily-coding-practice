"""
====================================================================
Problem: Single Number II (LeetCode 137)
Difficulty: Medium
Topic: Array, Bit Manipulation
====================================================================

Given an integer array nums where every element appears three times
except for one, which appears exactly once. Find the single element
and return it.

You must implement a solution with a linear runtime complexity and
use only constant extra space.

Example 1:
Input: nums = [2,2,3,2]
Output: 3

Example 2:
Input: nums = [0,1,0,1,0,1,99]
Output: 99

Constraints:
- 1 <= nums.length <= 3 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- Each element in nums appears exactly three times except for one
  element which appears once.
====================================================================
"""

from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        """
        Bit manipulation using two bitmask states:
        - ones: holds bits that have appeared 1 time (mod 3)
        - twos: holds bits that have appeared 2 times (mod 3)
        When a bit appears a third time, both ones and twos reset that bit to 0.

        Time Complexity: O(n) single pass
        Space Complexity: O(1) constant auxiliary space
        """
        ones = 0
        twos = 0

        for num in nums:
            # Add num to ones if it is not in twos
            ones = (ones ^ num) & ~twos
            # Add num to twos if it is not in ones
            twos = (twos ^ num) & ~ones

        return ones


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [2, 2, 3, 2] -> 3
    assert solver.singleNumber([2, 2, 3, 2]) == 3, "Test 1 failed"
    print("Test 1 Passed: [2, 2, 3, 2] -> 3")

    # Test 2: [0, 1, 0, 1, 0, 1, 99] -> 99
    assert solver.singleNumber([0, 1, 0, 1, 0, 1, 99]) == 99, "Test 2 failed"
    print("Test 2 Passed: [0, 1, 0, 1, 0, 1, 99] -> 99")

    # Test 3: Negative numbers: [-2, -2, 1, 1, -3, 1, -3, -3, -4, -2] -> -4
    neg_test = [-2, -2, 1, 1, -3, 1, -3, -3, -4, -2]
    assert solver.singleNumber(neg_test) == -4, "Test 3 failed"
    print(f"Test 3 Passed: negative numbers -> -4")

    # Test 4: Single element array: [42] -> 42
    assert solver.singleNumber([42]) == 42, "Test 4 failed"
    print("Test 4 Passed: [42] -> 42")

    # Test 5: Negative single element: [-1] -> -1
    assert solver.singleNumber([-1]) == -1, "Test 5 failed"
    print("Test 5 Passed: [-1] -> -1")

    print("\nAll Single Number II tests passed successfully!")
