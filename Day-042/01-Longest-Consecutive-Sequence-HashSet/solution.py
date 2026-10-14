"""
Problem: Longest Consecutive Sequence (LeetCode 128)
Difficulty: Medium
Topic: Array / Hash Table / Union Find

Description:
Given an unsorted array of integers nums, return the length of the longest
consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4].
Therefore its length is 4.

Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Constraints:
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

Complexity Analysis:
- Time Complexity: O(n) although the time loop is inside the for loop, each number is visited at most twice.
- Space Complexity: O(n) to store numbers in a hash set.
"""

from typing import List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if not nums:
            return 0

        num_set = set(nums)
        longest_streak = 0

        for num in num_set:
            # Only start counting if num is the start of a sequence (num - 1 not in set)
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1

                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                longest_streak = max(longest_streak, current_streak)

        return longest_streak


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([100, 4, 200, 1, 3, 2], 4),
        ([0, 3, 7, 2, 5, 8, 4, 6, 0, 1], 9),
        ([], 0),
        ([1], 1),
        ([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6], 7),  # [3,4,5,6,7,8,9]
        ([10, 5, 12, 3, 55, 30, 4, 11, 2], 4),  # [2,3,4,5]
        ([-2, -3, -1, 0, 1, 5, 6], 5),  # [-3,-2,-1,0,1]
    ]

    for idx, (nums, expected) in enumerate(test_cases, 1):
        res = sol.longestConsecutive(nums)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums[:6]}... -> longest consecutive = {res}")

    print("\nAll Longest Consecutive Sequence tests passed successfully!")
