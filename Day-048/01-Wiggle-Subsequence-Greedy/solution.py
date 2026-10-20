"""
====================================================================
Problem: Wiggle Subsequence (LeetCode 376)
Difficulty: Medium
Topic: Array, Dynamic Programming, Greedy
====================================================================

A wiggle sequence is a sequence where the differences between
successive numbers strictly alternate between positive and negative.
The first difference (if one exists) may be either positive or negative.
A sequence with one element and a sequence with two non-equal elements
are trivially wiggle sequences.

For example, [1, 7, 4, 9, 2, 5] is a wiggle sequence because the
differences (6, -3, 5, -7, 3) alternate in sign.
In contrast, [1, 4, 7, 2, 5] and [1, 7, 4, 5, 5] are not wiggle sequences.
The first is not because its first two differences are positive, and the
second is not because its last difference is zero.

A subsequence is obtained by deleting some number of elements (possibly zero)
from the original sequence, leaving the remaining elements in their original order.

Given an integer array nums, return the length of the longest wiggle subsequence
of nums.

Example 1:
Input: nums = [1,7,4,9,2,5]
Output: 6
Explanation: The entire sequence is a wiggle sequence with differences (6, -3, 5, -7, 3).

Example 2:
Input: nums = [1,17,5,10,13,15,10,5,16,8]
Output: 7
Explanation: There are several subsequences that achieve this length.
One is [1, 17, 10, 13, 10, 16, 8] with differences (16, -7, 3, -3, 6, -8).

Example 3:
Input: nums = [1,2,3,4,5,6,7,8,9]
Output: 2

Constraints:
- 1 <= nums.length <= 1000
- 0 <= nums[i] <= 1000

Follow up: Could you solve this in O(n) time?
====================================================================
"""

from typing import List

class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        """
        Greedy / Linear DP approach.
        We count the number of peaks and valleys in the sequence.
        up tracks the length of the longest wiggle subsequence ending with an upward slope.
        down tracks the length of the longest wiggle subsequence ending with a downward slope.

        Time Complexity: O(n) single pass
        Space Complexity: O(1) auxiliary variables
        """
        if not nums:
            return 0
        if len(nums) < 2:
            return len(nums)

        up = 1
        down = 1

        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                up = down + 1
            elif nums[i] < nums[i - 1]:
                down = up + 1

        return max(up, down)


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: Full wiggle sequence
    nums1 = [1, 7, 4, 9, 2, 5]
    assert solver.wiggleMaxLength(nums1) == 6, "Test 1 failed"
    print(f"Test 1 Passed: {nums1} -> 6")

    # Test 2: Standard case
    nums2 = [1, 17, 5, 10, 13, 15, 10, 5, 16, 8]
    assert solver.wiggleMaxLength(nums2) == 7, "Test 2 failed"
    print(f"Test 2 Passed: {nums2[:5]}... -> 7")

    # Test 3: Strictly increasing sequence
    nums3 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    assert solver.wiggleMaxLength(nums3) == 2, "Test 3 failed"
    print(f"Test 3 Passed: {nums3} -> 2")

    # Test 4: Single element
    nums4 = [42]
    assert solver.wiggleMaxLength(nums4) == 1, "Test 4 failed"
    print(f"Test 4 Passed: {nums4} -> 1")

    # Test 5: All identical elements
    nums5 = [3, 3, 3, 3]
    assert solver.wiggleMaxLength(nums5) == 1, "Test 5 failed"
    print(f"Test 5 Passed: {nums5} -> 1")

    # Test 6: Alternating with flat plateaus: [1, 2, 2, 2, 1]
    nums6 = [1, 2, 2, 2, 1]
    assert solver.wiggleMaxLength(nums6) == 3, "Test 6 failed"
    print(f"Test 6 Passed: {nums6} -> 3")

    print("\nAll Wiggle Subsequence tests passed successfully!")
