"""
Problem Name: Find Median from Data Stream
Problem Statement: The median is the middle value in an ordered integer list. Design a data structure that supports adding numbers
and finding the current median in constant/logarithmic time.

Approach: Two Heaps (Max-Heap `max_heap` using negative values for lower half, Min-Heap `min_heap` for upper half).
Rebalance heaps so size difference is at most 1.

Time Complexity: O(log N) for addNum, O(1) for findMedian
Space Complexity: O(N)
"""

import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (invert values)
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
    print("Median:", mf.findMedian())  # Expected: 1.5
    mf.addNum(3)
    print("Median:", mf.findMedian())  # Expected: 2.0
