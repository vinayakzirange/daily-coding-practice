"""
Problem Name: Sliding Window Maximum
Problem Statement: You are given an array of integers nums, there is a sliding window of size k which is moving
from the very left of the array to the very right. Return the max sliding window.

Approach: Monotonic Decreasing Deque storing indices.

Time Complexity: O(N)
Space Complexity: O(K)
"""

from collections import deque
from typing import List

class Solution:
    @staticmethod
    def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
        if not nums or k <= 0:
            return []

        result = []
        deq = deque()  # stores indices

        for i, num in enumerate(nums):
            # Remove indices outside window
            while deq and deq[0] < i - k + 1:
                deq.popleft()

            # Remove smaller elements from back
            while deq and nums[deq[-1]] < num:
                deq.pop()

            deq.append(i)

            if i >= k - 1:
                result.append(nums[deq[0]])

        return result

if __name__ == "__main__":
    nums = [1, 3, -1, -3, 5, 3, 6, 7]
    k = 3
    print("Sliding Window Max:", Solution.maxSlidingWindow(nums, k))  # Expected: [3, 3, 5, 5, 6, 7]
