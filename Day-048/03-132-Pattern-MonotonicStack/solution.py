"""
====================================================================
Problem: 132 Pattern (LeetCode 456)
Difficulty: Medium
Topic: Array, Binary Search, Stack, Monotonic Stack, Ordered Set
====================================================================

Given an array of n integers nums, a 132 pattern is a subsequence of
three integers nums[i], nums[j] and nums[k] such that i < j < k and
nums[i] < nums[k] < nums[j].

Return true if there is a 132 pattern in nums, otherwise, return false.

Example 1:
Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.

Example 2:
Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].

Example 3:
Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence:
[-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].

Constraints:
- n == nums.length
- 1 <= n <= 2 * 10^5
- -10^9 <= nums[i] <= 10^9
====================================================================
"""

from typing import List

class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        """
        Monotonic Decreasing Stack scanning from right to left.
        We search for pattern (nums[i], nums[j], nums[k]) with i < j < k and nums[i] < nums[k] < nums[j].
        - nums[j] will be elements in the stack.
        - nums[k] (the '2' in '132') is tracked by third (the largest valid nums[k] found so far).
        - If we encounter nums[i] < third, we immediately found a valid '1' < '2' < '3'.
        - Scanning backwards:
          Whenever current number > stack[-1], current number is candidate for nums[j],
          and we pop elements smaller than it to become candidates for nums[k].

        Time Complexity: O(n) single pass backwards
        Space Complexity: O(n) for monotonic stack
        """
        if len(nums) < 3:
            return False

        stack = []
        third = float('-inf')  # tracks nums[k]

        for num in reversed(nums):
            # If current num is smaller than nums[k], we found nums[i] < nums[k] < nums[j]
            if num < third:
                return True

            # If current num is larger than stack top, it can serve as nums[j]
            while stack and num > stack[-1]:
                third = stack.pop()

            stack.append(num)

        return False


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [1, 2, 3, 4] -> False
    nums1 = [1, 2, 3, 4]
    assert solver.find132pattern(nums1) is False, "Test 1 failed"
    print(f"Test 1 Passed: {nums1} -> False")

    # Test 2: [3, 1, 4, 2] -> True ([1, 4, 2])
    nums2 = [3, 1, 4, 2]
    assert solver.find132pattern(nums2) is True, "Test 2 failed"
    print(f"Test 2 Passed: {nums2} -> True")

    # Test 3: [-1, 3, 2, 0] -> True
    nums3 = [-1, 3, 2, 0]
    assert solver.find132pattern(nums3) is True, "Test 3 failed"
    print(f"Test 3 Passed: {nums3} -> True")

    # Test 4: Length < 3
    assert solver.find132pattern([1, 2]) is False, "Test 4 failed"
    print("Test 4 Passed: [1, 2] -> False")

    # Test 5: Decreasing array [4, 3, 2, 1] -> False
    assert solver.find132pattern([4, 3, 2, 1]) is False, "Test 5 failed"
    print("Test 5 Passed: [4, 3, 2, 1] -> False")

    # Test 6: Pattern with negatives: [-2, 1, -2] -> False
    assert solver.find132pattern([-2, 1, -2]) is False, "Test 6 failed"
    print("Test 6 Passed: [-2, 1, -2] -> False")

    print("\nAll 132 Pattern tests passed successfully!")
