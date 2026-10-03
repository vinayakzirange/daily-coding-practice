"""
Problem Name: Product of Array Except Self
Problem Statement: Given an integer array nums, return an array answer such that answer[i] is equal
to the product of all the elements of nums except nums[i], without using division.

Approach: Compute prefix products into output array, then multiply by suffix products from right to left.

Time Complexity: O(N)
Space Complexity: O(1) auxiliary space (excluding result array)
"""

from typing import List

class Solution:
    @staticmethod
    def productExceptSelf(nums: List[int]) -> List[int]:
        n = len(nums)
        result = [1] * n

        # Prefix products
        for i in range(1, n):
            result[i] = result[i - 1] * nums[i - 1]

        # Suffix products
        suffix = 1
        for i in range(n - 1, -1, -1):
            result[i] *= suffix
            suffix *= nums[i]

        return result

if __name__ == "__main__":
    nums = [1, 2, 3, 4]
    print("Product Except Self:", Solution.productExceptSelf(nums))  # Expected: [24, 12, 8, 6]
