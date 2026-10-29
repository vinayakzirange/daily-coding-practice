r"""
====================================================================
Problem: Valid Triangle Number (LeetCode 611)
Difficulty: Medium
Topic: Array, Two Pointers, Binary Search, Greedy, Sorting
====================================================================

Given an integer array nums, return the number of triplets chosen
from the array that can make triangles if we take them as side
lengths of a triangle.

Three sides a, b, c form a valid triangle if:
a + b > c, a + c > b, and b + c > a.
When sorted such that a <= b <= c, we only need to verify a + b > c.

Example 1:
Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are:
2,3,4 (using first 2)
2,3,4 (using second 2)
2,2,3

Example 2:
Input: nums = [4,2,3,4]
Output: 4

Constraints:
- 1 <= nums.length <= 1000
- 0 <= nums[i] <= 1000
====================================================================
"""

from typing import List


class Solution:
    def triangleNumber(self, nums: List[int]) -> int:
        """
        Sorts the array and uses two pointers for each choice of the longest side.

        Complexity:
        - Time: O(N^2) where N is the length of nums
        - Space: O(1) auxiliary space beyond sorting
        """
        nums.sort()
        count = 0
        n = len(nums)

        # Fix the longest side c = nums[k]
        for k in range(n - 1, 1, -1):
            left = 0
            right = k - 1

            while left < right:
                if nums[left] + nums[right] > nums[k]:
                    # Since nums is sorted, all elements from left to right - 1
                    # when paired with nums[right] also satisfy the inequality
                    count += right - left
                    right -= 1
                else:
                    left += 1

        return count


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: [2, 2, 3, 4] -> 3
    assert sol.triangleNumber([2, 2, 3, 4]) == 3, "Test 1 failed"

    # Test 2: [4, 2, 3, 4] -> 4
    assert sol.triangleNumber([4, 2, 3, 4]) == 4, "Test 2 failed"

    # Test 3: Array with zeros [0, 1, 0, 1] -> 0
    assert sol.triangleNumber([0, 1, 0, 1]) == 0, "Test 3 failed"

    # Test 4: Too small array [1, 2] -> 0
    assert sol.triangleNumber([1, 2]) == 0, "Test 4 failed"

    # Test 5: Equilateral triangle [3, 3, 3] -> 1
    assert sol.triangleNumber([3, 3, 3]) == 1, "Test 5 failed"

    print("All Valid Triangle Number tests passed successfully!")
