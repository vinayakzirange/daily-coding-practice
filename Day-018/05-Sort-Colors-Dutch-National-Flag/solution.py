"""
Problem: Sort Colors (Dutch National Flag Algorithm)
Topic: Three Pointers / In-Place Sorting
Language: Python

Approach:
Maintain 3 pointers: low (0s end boundary), mid (current element), high (2s start boundary).
Swapping 0s to low++ and 2s to high-- sorts the array in a single pass.

Time Complexity: O(N)
Space Complexity: O(1)
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
    print("Sorted ->", nums)  # [0, 0, 1, 1, 2, 2]
