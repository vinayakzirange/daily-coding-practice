"""
Problem Name: Search in Rotated Sorted Array
Problem Statement: Given a rotated sorted array nums and a target value, return the index of target if it is in nums, or -1.
Must run in O(log n) time.

Approach: Modified Binary Search. Identify which half (left or right) is sorted at mid, then check if target lies within bounds.

Time Complexity: O(log N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def search(nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid

            # Left half is sorted
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            # Right half is sorted
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1

        return -1

if __name__ == "__main__":
    nums = [4, 5, 6, 7, 0, 1, 2]
    print("Index of 0:", Solution.search(nums, 0))  # Expected: 4
    print("Index of 3:", Solution.search(nums, 3))  # Expected: -1
