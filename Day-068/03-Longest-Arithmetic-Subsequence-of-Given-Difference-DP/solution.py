"""
Problem: Longest Arithmetic Subsequence of Given Difference (LeetCode 1218)
Difficulty: Medium
Language: Python

Given an integer array arr and an integer difference, return the length of the longest
arithmetic subsequence in arr where the difference between adjacent elements in the
subsequence equals difference.

A subsequence is a sequence that can be derived from arr by deleting some or no elements
without changing the order of the remaining elements.

Example 1:
    Input: arr = [1,2,3,4], difference = 1
    Output: 4
    Explanation: The longest arithmetic subsequence is [1,2,3,4].

Example 2:
    Input: arr = [1,3,5,7], difference = 1
    Output: 1
    Explanation: The longest arithmetic subsequence is any single element.

Example 3:
    Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
    Output: 4
    Explanation: The longest arithmetic subsequence is [7,5,3,1].

Constraints:
    1 <= arr.length <= 10^5
    -10^4 <= arr[i], difference <= 10^4
"""

from typing import List


class Solution:
    def longestSubsequence(self, arr: List[int], difference: int) -> int:
        """
        Calculates length of longest arithmetic subsequence with given difference using Hash Map DP.
        
        Complexity:
            Time: O(N) - Single pass over arr performing O(1) hash table lookups and insertions.
            Space: O(N) - Hash map storing the DP length for each unique value.
        """
        dp = {}
        max_len = 0

        for x in arr:
            # If the predecessor (x - difference) exists, extend that subsequence; else start length 1
            prev_len = dp.get(x - difference, 0)
            dp[x] = prev_len + 1
            if dp[x] > max_len:
                max_len = dp[x]

        return max_len


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.longestSubsequence([1, 2, 3, 4], 1) == 4, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.longestSubsequence([1, 3, 5, 7], 1) == 1, "Test 2 Failed"

    # Test 3: Example 3
    assert sol.longestSubsequence([1, 5, 7, 8, 5, 3, 4, 2, 1], -2) == 4, "Test 3 Failed"

    # Test 4: Difference = 0 (longest sequence of identical values)
    assert sol.longestSubsequence([3, 3, 3, 3, 3], 0) == 5, "Test 4 Failed"

    # Test 5: Single element
    assert sol.longestSubsequence([42], 5) == 1, "Test 5 Failed"

    print("All Longest Arithmetic Subsequence of Given Difference tests passed successfully!")
