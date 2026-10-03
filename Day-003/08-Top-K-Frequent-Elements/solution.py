"""
Problem Name: Top K Frequent Elements
Problem Statement: Given an integer array nums and an integer k, return the k most frequent elements.

Approach: Frequency Map + Min-Heap (heapq) based on element frequencies.

Time Complexity: O(N log K)
Space Complexity: O(N + K)
"""

import heapq
from collections import Counter
from typing import List

class Solution:
    @staticmethod
    def topKFrequent(nums: List[int], k: int) -> List[int]:
        count = Counter(nums)
        return [item[0] for item in heapq.nlargest(k, count.items(), key=lambda x: x[1])]

if __name__ == "__main__":
    nums = [1, 1, 1, 2, 2, 3]
    k = 2
    print("Top 2 frequent:", Solution.topKFrequent(nums, k))  # Expected: [1, 2]
