"""
Problem: Longest Subarray of 1's After Deleting One Element (LeetCode 1493)
Difficulty: Medium
Category: Array / Dynamic Programming / Sliding Window

Description:
Given a binary array nums, you should delete one element from it.

Return the size of the longest non-empty subarray containing only 1's in the
resulting array. Return 0 if there is no such subarray.

Example 1:
    Input: nums = [1,1,0,1]
    Output: 3
    Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.

Example 2:
    Input: nums = [0,1,1,1,0,1,1,0,1]
    Output: 5
    Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray of 1's is [1,1,1,1,1].

Example 3:
    Input: nums = [1,1,1]
    Output: 2
    Explanation: You must delete one element, so resulting array is [1,1] of length 2.

Constraints:
    - 1 <= nums.length <= 10^5
    - nums[i] is either 0 or 1.
"""

from typing import List


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        """
        Finds the maximum length of a subarray of 1's after deleting exactly one element.

        Simple Sliding Window Logic:
        Deleting one element means finding the longest window containing at most one 0.
        The resulting length of 1's is (window_size - 1) = right - left.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        left = 0
        zero_count = 0
        max_len = 0

        for right in range(len(nums)):
            if nums[right] == 0:
                zero_count += 1

            while zero_count > 1:
                if nums[left] == 0:
                    zero_count -= 1
                left += 1

            max_len = max(max_len, right - left)

        return max_len


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.longestSubarray([1, 1, 0, 1]) == 3, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1]) == 5, "Test 2 Failed"

    # Test 3: Example 3 (all 1s, must delete one)
    assert sol.longestSubarray([1, 1, 1]) == 2, "Test 3 Failed"

    # Test 4: All 0s
    assert sol.longestSubarray([0, 0, 0]) == 0, "Test 4 Failed"

    # Test 5: Single element 1 -> delete 1 -> 0 remaining
    assert sol.longestSubarray([1]) == 0, "Test 5 Failed"

    # Test 6: Single element 0 -> delete 0 -> 0 remaining
    assert sol.longestSubarray([0]) == 0, "Test 6 Failed"

    # Test 7: Alternating 1 and 0: [1, 0, 1, 0, 1] -> delete a 0 gives [1, 1] length 2
    assert sol.longestSubarray([1, 0, 1, 0, 1]) == 2, "Test 7 Failed"

    print("All tests passed for 01-Longest-Subarray-of-1s-After-Deleting-One-Element-SlidingWindow!")


if __name__ == "__main__":
    run_tests()
