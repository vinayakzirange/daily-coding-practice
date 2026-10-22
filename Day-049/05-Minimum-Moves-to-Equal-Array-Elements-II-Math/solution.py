"""
====================================================================
Problem: Minimum Moves to Equal Array Elements II (LeetCode 462)
Difficulty: Medium
Topic: Array, Math, Sorting
====================================================================

Given an integer array nums of size n, return the minimum number of
moves required to make all array elements equal.

In one move, you can increment or decrement an element of the array
by 1.

Test cases are designed so that the answer will fit in a 32-bit integer.

Example 1:
Input: nums = [1,2,3]
Output: 2
Explanation:
Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]

Example 2:
Input: nums = [1,10,2,9]
Output: 16

Constraints:
- n == nums.length
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
====================================================================
"""

from typing import List

class Solution:
    def minMoves2(self, nums: List[int]) -> int:
        """
        Mathematical Optimization:
        To minimize the sum of absolute deviations sum(|nums[i] - target|),
        the optimal target is the MEDIAN of the array.
        Sorting the array places the median at index n // 2.
        Total moves is sum(|nums[i] - median|).

        Time Complexity: O(n log n) for sorting (or O(n) via Quickselect)
        Space Complexity: O(1) auxiliary space (or O(n) depending on sort implementation)
        """
        nums.sort()
        median = nums[len(nums) // 2]
        return sum(abs(x - median) for x in nums)


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [1, 2, 3] -> 2
    assert solver.minMoves2([1, 2, 3]) == 2, "Test 1 failed"
    print("Test 1 Passed: [1, 2, 3] -> 2")

    # Test 2: [1, 10, 2, 9] -> 16
    assert solver.minMoves2([1, 10, 2, 9]) == 16, "Test 2 failed"
    print("Test 2 Passed: [1, 10, 2, 9] -> 16")

    # Test 3: Single element
    assert solver.minMoves2([5]) == 0, "Test 3 failed"
    print("Test 3 Passed: [5] -> 0")

    # Test 4: All equal elements
    assert solver.minMoves2([7, 7, 7, 7]) == 0, "Test 4 failed"
    print("Test 4 Passed: [7, 7, 7, 7] -> 0")

    # Test 5: Negative numbers: [-5, 0, 5] -> 10
    assert solver.minMoves2([-5, 0, 5]) == 10, "Test 5 failed"
    print("Test 5 Passed: [-5, 0, 5] -> 10")

    # Test 6: Even length: [1, 2] -> 1
    assert solver.minMoves2([1, 2]) == 1, "Test 6 failed"
    print("Test 6 Passed: [1, 2] -> 1")

    print("\nAll Minimum Moves to Equal Array Elements II tests passed successfully!")
