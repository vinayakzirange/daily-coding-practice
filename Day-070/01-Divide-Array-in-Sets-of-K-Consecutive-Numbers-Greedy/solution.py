"""
Problem: Divide Array in Sets of K Consecutive Numbers (LeetCode 1296)
Difficulty: Medium
Language: Python

Given an array of integers nums and a positive integer k, check whether it is possible
to divide this array into sets of k consecutive numbers.

Return True if it is possible. Otherwise, return False.

Example 1:
    Input: nums = [1,2,3,3,4,4,5,6], k = 4
    Output: true
    Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].

Example 2:
    Input: nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
    Output: true
    Explanation: Array can be divided into [1,2,3], [2,3,4], [3,4,5] and [9,10,11].

Example 3:
    Input: nums = [1,2,3,4], k = 3
    Output: false
    Explanation: Each array should be divided into sets of 3, but the length is not divisible by 3.

Constraints:
    1 <= k <= nums.length <= 10^5
    1 <= nums[i] <= 10^9
"""

from collections import Counter
from typing import List


class Solution:
    def isPossibleDivide(self, nums: List[int], k: int) -> bool:
        """
        Determines if array can be partitioned into sets of k consecutive integers using Greedy Frequency Matching.
        
        Complexity:
            Time: O(N * log(U)) where N = len(nums) and U is count of unique numbers (due to sorting unique keys).
            Space: O(U) for frequency map.
        """
        if len(nums) % k != 0:
            return False

        counts = Counter(nums)
        sorted_keys = sorted(counts.keys())

        for x in sorted_keys:
            cnt = counts[x]
            if cnt > 0:
                # Greedily form groups of k consecutive numbers starting from x
                for i in range(k):
                    target = x + i
                    if counts[target] < cnt:
                        return False
                    counts[target] -= cnt

        return True


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.isPossibleDivide([1, 2, 3, 3, 4, 4, 5, 6], 4) is True, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.isPossibleDivide([3, 2, 1, 2, 3, 4, 3, 4, 5, 9, 10, 11], 3) is True, "Test 2 Failed"

    # Test 3: Example 3 (Length not divisible)
    assert sol.isPossibleDivide([1, 2, 3, 4], 3) is False, "Test 3 Failed"

    # Test 4: Cannot form consecutive sequence ([1, 2] and [3, 5] fails)
    assert sol.isPossibleDivide([1, 2, 3, 5], 2) is False, "Test 4 Failed"

    # Test 5: Multiple disjoint valid consecutive sets
    assert sol.isPossibleDivide([1, 2, 4, 5], 2) is True, "Test 5 Failed"

    # Test 6: k = 1 (always possible)
    assert sol.isPossibleDivide([10, 20, 30], 1) is True, "Test 6 Failed"

    print("All Divide Array in Sets of K Consecutive Numbers tests passed successfully!")
