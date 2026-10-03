"""
Problem Name: Sort Colors (Dutch National Flag Problem)
Problem Statement: Given an array nums with n objects colored red, white, or blue (represented as 0, 1, and 2),
sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

Approach: Dutch National Flag algorithm using three pointers (low, mid, high).
- Swap 0s to low pointer and increment low and mid.
- If element is 1, just increment mid.
- Swap 2s to high pointer and decrement high.

Time Complexity: O(N) - Single pass
Space Complexity: O(1) - In-place
"""

from typing import List

class Solution:
    @staticmethod
    def sortColors(nums: List[int]) -> None:
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1

if __name__ == "__main__":
    nums = [2, 0, 2, 1, 1, 0]
    Solution.sortColors(nums)
    print("Sorted colors:", nums)  # Expected: [0, 0, 1, 1, 2, 2]
