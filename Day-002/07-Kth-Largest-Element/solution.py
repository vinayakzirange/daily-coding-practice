"""
Problem Name: Kth Largest Element in an Array
Problem Statement: Given an integer array nums and an integer k, return the kth largest element in the array.

Approach: Min-Heap using heapq of size k. Maintain only the k largest elements in the min-heap.
The root of the heap will be the Kth largest element.

Time Complexity: O(N log K)
Space Complexity: O(K)
"""

import heapq
from typing import List

class Solution:
    @staticmethod
    def findKthLargest(nums: List[int], k: int) -> int:
        min_heap = []
        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) > k:
                heapq.heappop(min_heap)
        return min_heap[0]

if __name__ == "__main__":
    nums = [3, 2, 1, 5, 6, 4]
    k = 2
    print("2nd Largest Element:", Solution.findKthLargest(nums, k))  # Expected: 5
