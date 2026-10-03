"""
Problem Name: 3Sum
Problem Statement: Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Approach: Sort array, iterate i, and use Two Pointers (left, right) to find pairs summing to -nums[i].
Skip duplicates for all three pointers to ensure unique triplets.

Time Complexity: O(N^2)
Space Complexity: O(1) (excluding space for result list)
"""

from typing import List

class Solution:
    @staticmethod
    def threeSum(nums: List[int]) -> List[List[int]]:
        nums.sort()
        result = []
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
    print("3Sum Triplets:", Solution.threeSum(nums))  # Expected: [[-1, -1, 2], [-1, 0, 1]]
