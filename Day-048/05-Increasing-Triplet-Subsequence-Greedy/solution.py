"""
====================================================================
Problem: Increasing Triplet Subsequence (LeetCode 334)
Difficulty: Medium
Topic: Array, Greedy
====================================================================

Given an integer array nums, return true if there exists a triple
of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k].
If no such indices exist, return false.

Example 1:
Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.

Example 2:
Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.

Example 3:
Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: The triplet (3, 4, 5) is valid because
nums[3] == 0 < nums[4] == 4 < nums[5] == 6.

Constraints:
- 1 <= nums.length <= 5 * 10^5
- -2^31 <= nums[i] <= 2^31 - 1

Follow up: Could you implement a solution that runs in O(n) time
complexity and O(1) space complexity?
====================================================================
"""

from typing import List

class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        """
        Greedy approach maintaining two variables:
        - first: minimum value seen so far
        - second: minimum value greater than first seen so far
        If we find an element greater than second, we have found an increasing triplet!

        Time Complexity: O(n) single pass
        Space Complexity: O(1) auxiliary space
        """
        first = float('inf')
        second = float('inf')

        for num in nums:
            if num <= first:
                first = num
            elif num <= second:
                second = num
            else:
                # num > first and num > second
                return True

        return False


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [1, 2, 3, 4, 5] -> True
    assert solver.increasingTriplet([1, 2, 3, 4, 5]) is True, "Test 1 failed"
    print("Test 1 Passed: [1, 2, 3, 4, 5] -> True")

    # Test 2: [5, 4, 3, 2, 1] -> False
    assert solver.increasingTriplet([5, 4, 3, 2, 1]) is False, "Test 2 failed"
    print("Test 2 Passed: [5, 4, 3, 2, 1] -> False")

    # Test 3: [2, 1, 5, 0, 4, 6] -> True (0 < 4 < 6)
    assert solver.increasingTriplet([2, 1, 5, 0, 4, 6]) is True, "Test 3 failed"
    print("Test 3 Passed: [2, 1, 5, 0, 4, 6] -> True")

    # Test 4: Array length < 3
    assert solver.increasingTriplet([1, 2]) is False, "Test 4 failed"
    print("Test 4 Passed: [1, 2] -> False")

    # Test 5: Duplicates: [1, 1, 1, 1] -> False
    assert solver.increasingTriplet([1, 1, 1, 1]) is False, "Test 5 failed"
    print("Test 5 Passed: [1, 1, 1, 1] -> False")

    # Test 6: Triplet with new minimum replacing first: [20, 100, 10, 12, 5, 13] -> True
    assert solver.increasingTriplet([20, 100, 10, 12, 5, 13]) is True, "Test 6 failed"
    print("Test 6 Passed: [20, 100, 10, 12, 5, 13] -> True")

    print("\nAll Increasing Triplet Subsequence tests passed successfully!")
