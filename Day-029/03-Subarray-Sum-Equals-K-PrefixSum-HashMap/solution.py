"""
Problem: Subarray Sum Equals K (LeetCode 560)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(N)
"""

from collections import defaultdict
from typing import List

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        count = 0
        prefix_sum = 0
        prefix_count = defaultdict(int)
        prefix_count[0] = 1

        for num in nums:
            prefix_sum += num
            if (prefix_sum - k) in prefix_count:
                count += prefix_count[prefix_sum - k]
            prefix_count[prefix_sum] += 1

        return count

if __name__ == "__main__":
    sol = Solution()
    print("Subarray Sum Count (k=2):", sol.subarraySum([1, 1, 1], 2))  # 2
    print("Subarray Sum Count (k=3):", sol.subarraySum([1, 2, 3], 3))  # 2
