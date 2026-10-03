"""
Problem Name: Merge Sorted Array
Problem Statement: You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
Merge nums2 into nums1 as one sorted array in-place.

Approach: Three pointers starting from the back (m - 1, n - 1, and m + n - 1) to avoid overwriting elements in nums1.

Time Complexity: O(m + n)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def merge(nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        p1 = m - 1
        p2 = n - 1
        p = m + n - 1

        while p1 >= 0 and p2 >= 0:
            if nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1

        while p2 >= 0:
            nums1[p] = nums2[p2]
            p2 -= 1
            p -= 1

if __name__ == "__main__":
    nums1 = [1, 2, 3, 0, 0, 0]
    nums2 = [2, 5, 6]
    Solution.merge(nums1, 3, nums2, 3)
    print("Merged Array:", nums1)  # Expected: [1, 2, 2, 3, 5, 6]
