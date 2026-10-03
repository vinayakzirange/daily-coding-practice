"""
Problem: Intersection of Two Arrays II
Topic: HashMap / Array
Language: Python

Approach:
Count frequencies of elements in nums1. Iterate nums2, decrement count and collect matching elements.

Time Complexity: O(N + M)
Space Complexity: O(min(N, M))
"""

from collections import Counter
from typing import List

class Solution:
    @staticmethod
    def intersect(nums1: List[int], nums2: List[int]) -> List[int]:
        counts = Counter(nums1)
        result = []
        for num in nums2:
            if counts[num] > 0:
                result.append(num)
                counts[num] -= 1
        return result

if __name__ == "__main__":
    nums1, nums2 = [1, 2, 2, 1], [2, 2]
    print("Intersection:", Solution.intersect(nums1, nums2))  # [2, 2]
