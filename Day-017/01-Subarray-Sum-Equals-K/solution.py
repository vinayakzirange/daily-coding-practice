"""
Problem: Subarray Sum Equals K
Topic: Prefix Sum / HashMap
Language: Python

Approach:
Maintain running sum (prefix sum) and store frequencies of prefix sums in a HashMap.
For each index, check if map contains (currentPrefixSum - k). Add its frequency to count.

Time Complexity: O(N)
Space Complexity: O(N)
"""

from collections import defaultdict
from typing import List

class Solution:
    @staticmethod
    def subarraySum(nums: List[int], k: int) -> int:
        prefix_count = defaultdict(int)
        prefix_count[0] = 1
        current_sum = 0
        count = 0

        for num in nums:
            current_sum += num
            if (current_sum - k) in prefix_count:
                count += prefix_count[current_sum - k]
            prefix_count[current_sum] += 1

        return count

if __name__ == "__main__":
    print("[1,1,1], k=2 ->", Solution.subarraySum([1, 1, 1], 2))  # 2
    print("[1,2,3], k=3 ->", Solution.subarraySum([1, 2, 3], 3))  # 2
