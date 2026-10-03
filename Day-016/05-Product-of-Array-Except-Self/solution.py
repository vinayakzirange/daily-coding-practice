"""
Problem: Product of Array Except Self
Topic: Prefix and Suffix Products
Language: Python

Approach:
Compute running prefix products into result array, then backward pass accumulating
suffix product and multiplying in-place. O(1) extra space excluding result array.

Time Complexity: O(N)
Space Complexity: O(1) auxiliary space
"""

from typing import List

class Solution:
    @staticmethod
    def productExceptSelf(nums: List[int]) -> List[int]:
        n = len(nums)
        result = [1] * n

        for i in range(1, n):
            result[i] = result[i - 1] * nums[i - 1]

        suffix = 1
        for i in range(n - 1, -1, -1):
            result[i] *= suffix
            suffix *= nums[i]

        return result

if __name__ == "__main__":
    nums = [1, 2, 3, 4]
    print("[1,2,3,4] ->", Solution.productExceptSelf(nums))  # [24, 12, 8, 6]
