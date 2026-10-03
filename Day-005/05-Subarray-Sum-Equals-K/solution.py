"""
Problem Name: Subarray Sum Equals K
Problem Statement: Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

Approach: Prefix Sum + HashMap. Store frequency of prefix sums encountered so far.
If (currentPrefixSum - k) exists in map, add its frequency to result.

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

        count = 0
        curr_sum = 0

        for num in nums:
            curr_sum += num
            if (curr_sum - k) in prefix_count:
                count += prefix_count[curr_sum - k]
            prefix_count[curr_sum] += 1

        return count

if __name__ == "__main__":
    nums = [1, 1, 1]
    k = 2
    print("Total Subarrays with sum 2:", Solution.subarraySum(nums, k))  # Expected: 2
