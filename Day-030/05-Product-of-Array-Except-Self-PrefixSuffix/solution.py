"""
Problem: Product of Array Except Self (LeetCode 238)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(1) auxiliary space (excluding result array)
"""

from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n

        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]

        suffix = 1
        for i in range(n - 1, -1, -1):
            res[i] = res[i] * suffix
            suffix *= nums[i]

        return res

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4]
    print("Output:", sol.productExceptSelf(nums))  # [24, 12, 8, 6]
