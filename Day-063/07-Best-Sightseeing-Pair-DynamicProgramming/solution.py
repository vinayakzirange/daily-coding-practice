r"""
LeetCode 1014: Best Sightseeing Pair (Medium)
https://leetcode.com/problems/best-sightseeing-pair/

You are given an integer array values where values[i] represents the value of the ith sightseeing spot.
Two sightseeing spots i and j have a distance j - i between them.

The score of a pair (i < j) of sightseeing spots is values[i] + values[j] + i - j:
the sum of the values of the sightseeing spots, minus the distance between them.

Return the maximum score of a pair of sightseeing spots.

Example 1:
Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11

Example 2:
Input: values = [1,2]
Output: 2

Constraints:
- 2 <= values.length <= 5 * 10^4
- 1 <= values[i] <= 1000
"""

from typing import List


class Solution:
    def maxScoreSightseeingPair(self, values: List[int]) -> int:
        """
        Dynamic Programming / Single-Pass Greedy:
        The score formula can be decomposed into two independent terms:
            score(i, j) = (values[i] + i) + (values[j] - j)

        As we iterate through j from 1 to len(values) - 1:
          - We want to maximize (values[i] + i) for all previous indices i < j.
          - Maintain max_prev = max(values[i] + i) for all i < j.
          - At step j, the best pair ending at j has score: max_prev + values[j] - j.
          - Then update max_prev = max(max_prev, values[j] + j) for future spots.

        Time Complexity: O(N) where N is len(values).
        Space Complexity: O(1).
        """
        max_score = 0
        max_prev = values[0] + 0

        for j in range(1, len(values)):
            max_score = max(max_score, max_prev + values[j] - j)
            max_prev = max(max_prev, values[j] + j)

        return max_score


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1
    assert sol.maxScoreSightseeingPair([8, 1, 5, 2, 6]) == 11, "Test 1 Failed"

    # Test Case 2: Example 2
    assert sol.maxScoreSightseeingPair([1, 2]) == 2, "Test 2 Failed"

    # Test Case 3: Strictly decreasing values [5, 4, 3, 2, 1]
    # pairs: (0,1) -> 5+4-1=8; (1,2) -> 4+3-1=6; max is 8
    assert sol.maxScoreSightseeingPair([5, 4, 3, 2, 1]) == 8, "Test 3 Failed"

    # Test Case 4: Strictly increasing values [1, 2, 3, 4, 5]
    # (3, 4) -> 4+5-1=8
    assert sol.maxScoreSightseeingPair([1, 2, 3, 4, 5]) == 8, "Test 4 Failed"

    # Test Case 5: Large spike at end [1, 3, 5, 100] -> (2, 3) gives 5 + 100 - (3 - 2) = 104
    assert sol.maxScoreSightseeingPair([1, 3, 5, 100]) == 104, "Test 5 Failed"

    print("All Best Sightseeing Pair tests passed successfully!")
