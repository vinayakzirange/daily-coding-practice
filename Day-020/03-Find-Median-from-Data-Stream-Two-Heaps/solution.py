"""
Problem: Find Median from Data Stream
Topic: PriorityQueue / Two Heaps Design
Language: Python

Approach:
Maintain two heaps: Max-Heap (small_half) for smaller numbers and Min-Heap (large_half) for larger numbers.
Keep size difference between heaps <= 1. Median is top of max-heap if odd, or average of both tops if even.

Time Complexity: O(log N) for addNum, O(1) for findMedian
Space Complexity: O(N)
"""

import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negative values)
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))

        if len(self.small) < len(self.large):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0

if __name__ == "__main__":
    mf = MedianFinder()
    mf.addNum(1)
    mf.addNum(2)
    print("Median of [1,2] ->", mf.findMedian())  # 1.5
    mf.addNum(3)
    print("Median of [1,2,3] ->", mf.findMedian())  # 2.0
