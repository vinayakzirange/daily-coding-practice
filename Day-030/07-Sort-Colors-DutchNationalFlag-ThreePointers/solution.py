"""
Problem: Sort Colors (LeetCode 75)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    def sortColors(self, nums: List[int]) -> None:
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
    sol = Solution()
    nums = [2, 0, 2, 1, 1, 0]
    sol.sortColors(nums)
    print("Sorted Colors:", nums)  # [0, 0, 1, 1, 2, 2]
