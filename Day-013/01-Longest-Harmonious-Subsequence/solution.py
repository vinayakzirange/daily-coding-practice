"""
Problem: Longest Harmonious Subsequence
Topic: HashMap / Counting
Language: Python

Approach:
Count occurrences of each number in a HashMap. Iterate through keys, and if
map contains (key + 1), update maxLen = max(maxLen, count[key] + count[key + 1]).

Time Complexity: O(N)
Space Complexity: O(N)
"""

from collections import Counter
from typing import List

class Solution:
    @staticmethod
    def findLHS(nums: List[int]) -> int:
        counts = Counter(nums)
        max_len = 0
        for key in counts:
            if key + 1 in counts:
                max_len = max(max_len, counts[key] + counts[key + 1])
        return max_len

if __name__ == "__main__":
    nums1 = [1, 3, 2, 2, 5, 2, 3, 7]
    print("LHS [1, 3, 2, 2, 5, 2, 3, 7] ->", Solution.findLHS(nums1))  # 5
    nums2 = [1, 2, 3, 4]
    print("LHS [1, 2, 3, 4] ->", Solution.findLHS(nums2))  # 2
