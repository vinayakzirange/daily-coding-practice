r"""
LeetCode 1031: Maximum Sum of Two Non-Overlapping Subarrays (Medium)
https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/

Given an integer array nums and two integers firstLen and secondLen, return the
maximum sum of elements in two non-overlapping (contiguous) subarrays, which have
lengths firstLen and secondLen.

The subarray with length firstLen could occur before or after the subarray with length secondLen.

Example 1:
Input: nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2
Output: 20
Explanation: One choice of subarrays is [9] with length 1, and [6,5] with length 2.

Example 2:
Input: nums = [3,8,1,3,2,1,8,9,0], firstLen = 3, secondLen = 2
Output: 29
Explanation: One choice of subarrays is [3,8,1] with length 3, and [8,9] with length 2.

Example 3:
Input: nums = [2,1,5,6,0,9,5,0,3,8], firstLen = 4, secondLen = 3
Output: 31
Explanation: One choice of subarrays is [5,6,0,9] with length 4, and [0,3,8] with length 3.

Constraints:
- 1 <= firstLen, secondLen <= 1000
- 2 <= firstLen + secondLen <= nums.length <= 1000
- 0 <= nums[i] <= 1000
"""

from typing import List


class Solution:
    def maxSumTwoNoOverlap(self, nums: List[int], firstLen: int, secondLen: int) -> int:
        """
        Prefix Sum & Dynamic Window Max:
        Compute prefix sums P where P[i] = sum(nums[0..i-1]).
        Subarray sum of length L ending at index i is P[i] - P[i - L].

        Two ordering configurations exist:
        Case A: Subarray of length L comes strictly before subarray of length M.
        Case B: Subarray of length M comes strictly before subarray of length L.

        In a single pass for a fixed pair (L, M):
        For each ending position i of the second subarray (from L + M to len(nums)):
          - The first subarray must end at or before i - M.
          - Track max_L: the maximum sum of a length-L subarray seen so far ending at or before i - M.
          - Combine max_L with the current length-M subarray ending at i.

        Return max(solve(firstLen, secondLen), solve(secondLen, firstLen)).

        Time Complexity: O(N) where N is len(nums).
        Space Complexity: O(N) for prefix sums.
        """
        n = len(nums)
        P = [0] * (n + 1)
        for i in range(n):
            P[i + 1] = P[i] + nums[i]

        def max_two(L: int, M: int) -> int:
            max_L = 0
            best = 0
            for i in range(L + M, n + 1):
                # Subarray L ends at i - M
                sum_L = P[i - M] - P[i - M - L]
                max_L = max(max_L, sum_L)
                # Subarray M ends at i
                sum_M = P[i] - P[i - M]
                best = max(best, max_L + sum_M)
            return best

        return max(max_two(firstLen, secondLen), max_two(secondLen, firstLen))


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1
    assert sol.maxSumTwoNoOverlap([0, 6, 5, 2, 2, 5, 1, 9, 4], 1, 2) == 20, "Test 1 Failed"

    # Test Case 2: Example 2
    assert sol.maxSumTwoNoOverlap([3, 8, 1, 3, 2, 1, 8, 9, 0], 3, 2) == 29, "Test 2 Failed"

    # Test Case 3: Example 3
    assert sol.maxSumTwoNoOverlap([2, 1, 5, 6, 0, 9, 5, 0, 3, 8], 4, 3) == 31, "Test 3 Failed"

    # Test Case 4: Array length exactly firstLen + secondLen
    assert sol.maxSumTwoNoOverlap([1, 2, 3], 1, 2) == 6, "Test 4 Failed"

    # Test Case 5: All zeros
    assert sol.maxSumTwoNoOverlap([0, 0, 0, 0], 1, 1) == 0, "Test 5 Failed"

    print("All Maximum Sum of Two Non-Overlapping Subarrays tests passed successfully!")

