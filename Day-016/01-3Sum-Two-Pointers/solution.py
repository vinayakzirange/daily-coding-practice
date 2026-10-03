"""
Problem: 3Sum
Topic: Two Pointers / Sorting
Language: Python

Approach:
Sort the array. Iterate through each element i as the fixed first element.
Use two pointers (left = i + 1, right = n - 1) to find pairs summing to -nums[i].
Skip duplicate elements to ensure unique triplets.

Time Complexity: O(N^2)
Space Complexity: O(1) auxiliary (excluding output list)
"""

from typing import List

class Solution:
    @staticmethod
    def threeSum(nums: List[int]) -> List[List[int]]:
        result = []
        nums.sort()
        n = len(nums)

        for i in range(n - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, n - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1

        return result

if __name__ == "__main__":
    nums = [-1, 0, 1, 2, -1, -4]
    print("3Sum [-1,0,1,2,-1,-4] ->", Solution.threeSum(nums))  # [[-1,-1,2], [-1,0,1]]
