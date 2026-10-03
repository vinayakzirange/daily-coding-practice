"""
Problem Name: Maximum Product Subarray
Problem Statement: Given an integer array nums, find a contiguous non-empty subarray that has the largest product, and return the product.

Approach: Dynamic Programming keeping track of both max_product and min_product (since negative * negative = positive).

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def maxProduct(nums: List[int]) -> int:
        if not nums:
            return 0

        max_prod = nums[0]
        min_prod = nums[0]
        result = nums[0]

        for i in range(1, len(nums)):
            curr = nums[i]
            if curr < 0:
                max_prod, min_prod = min_prod, max_prod

            max_prod = max(curr, max_prod * curr)
            min_prod = min(curr, min_prod * curr)

            result = max(result, max_prod)

        return result

if __name__ == "__main__":
    nums1 = [2, 3, -2, 4]
    print("Max Product of [2,3,-2,4]:", Solution.maxProduct(nums1))  # Expected: 6
    nums2 = [-2, 0, -1]
    print("Max Product of [-2,0,-1]:", Solution.maxProduct(nums2))  # Expected: 0
