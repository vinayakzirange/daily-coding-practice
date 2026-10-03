"""
Problem: 3Sum (LeetCode 15)
Language: Python
Difficulty: Medium
Time Complexity: O(N^2)
Space Complexity: O(1) auxiliary space
"""

from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        if not nums or len(nums) < 3:
            return res

        nums.sort()

        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, len(nums) - 1

            while left < right:
                total = nums[i] + nums[left] + nums[right]

                if total == 0:
                    res.append([nums[i], nums[left], nums[right]])
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

        return res

if __name__ == "__main__":
    sol = Solution()
    nums = [-1, 0, 1, 2, -1, -4]
    print("3Sum Triplets:", sol.threeSum(nums))  # [[-1, -1, 2], [-1, 0, 1]]
