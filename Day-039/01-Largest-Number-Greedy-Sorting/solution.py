"""
Problem: Largest Number (LeetCode 179)
Difficulty: Medium
Topic: Array / Greedy / String / Custom Sorting

Description:
Given a list of non-negative integers nums, arrange them such that they form the largest
number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

Example 1:
Input: nums = [10,2]
Output: "210"

Example 2:
Input: nums = [3,30,34,5,9]
Output: "9534330"

Constraints:
  * 1 <= nums.length <= 100
  * 0 <= nums[i] <= 10^9

Complexity:
  * Time Complexity: O(n log n * k) where k is the average number of digits (k <= 10).
  * Space Complexity: O(n * k) for storing string representations of numbers.
"""

from functools import cmp_to_key
from typing import List


class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        # Convert all numbers to strings
        strs = [str(x) for x in nums]

        # Comparator: if a + b > b + a, a should come before b
        def compare(x: str, y: str) -> int:
            if x + y > y + x:
                return -1
            elif x + y < y + x:
                return 1
            else:
                return 0

        strs.sort(key=cmp_to_key(compare))

        # Handle edge case where the largest number is "0" (e.g. nums = [0, 0])
        if strs[0] == "0":
            return "0"

        return "".join(strs)


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([10, 2], "210"),
        ([3, 30, 34, 5, 9], "9534330"),
        ([0, 0], "0"),
        ([1], "1"),
        ([432, 43243], "43243432"),
        ([999999998, 999999997, 999999999], "999999999999999998999999997"),
    ]

    for idx, (nums, expected) in enumerate(test_cases, 1):
        res = sol.largestNumber(nums)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:5]}... -> largest number = {res}")

    print("\nAll Largest Number tests passed successfully!")
