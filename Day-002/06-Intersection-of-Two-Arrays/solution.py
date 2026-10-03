"""
Problem Name: Intersection of Two Arrays
Problem Statement: Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must be unique.

Approach: Use a set to store unique elements of nums1, then iterate through nums2 and add matches to a result set.

Time Complexity: O(N + M) where N and M are lengths of nums1 and nums2.
Space Complexity: O(N)
"""

from typing import List

class Solution:
    @staticmethod
    def intersection(nums1: List[int], nums2: List[int]) -> List[int]:
        set1 = set(nums1)
        return list(set1.intersection(nums2))

if __name__ == "__main__":
    nums1 = [1, 2, 2, 1]
    nums2 = [2, 2]
    print("Intersection:", Solution.intersection(nums1, nums2))  # Expected: [2]
