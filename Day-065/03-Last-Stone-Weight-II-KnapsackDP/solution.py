r"""
LeetCode 1049: Last Stone Weight II (Medium)
https://leetcode.com/problems/last-stone-weight-ii/

You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose any two stones and
smash them together. Suppose they have weights x and y with x <= y.
- If x == y, both stones are destroyed.
- If x < y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.

At the end of the game, there is at most one stone left.

Return the smallest possible weight of the left stone. If there are no stones left, return 0.

Example 1:
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation:
We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
we can combine 1 and 1 to get 0, so the array converts to [1], then that's the optimal value.

Example 2:
Input: stones = [31,26,33,21,40]
Output: 5

Constraints:
- 1 <= stones.length <= 30
- 1 <= stones[i] <= 100
"""

from typing import List


class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        """
        Reduction to 0-1 Knapsack / Subset Sum Partition:
        Smashing stones is algebraically equivalent to assigning positive (+) and negative (-)
        signs to each stone weight such that:
            min |sum(S_positive) - sum(S_negative)|

        Let total = sum(stones).
        We want to find a subset sum S_pos <= total // 2 that is as close to total // 2 as possible.
        The minimal remaining stone weight will be:
            total - 2 * max(S_pos)

        We can use a boolean DP set of all reachable subset sums.

        Time Complexity: O(N * (total / 2)) where N <= 30 and total <= 3000 -> <= 45,000 operations.
        Space Complexity: O(total / 2).
        """
        total = sum(stones)
        target = total // 2

        # dp[s] is True if subset sum s is achievable
        dp = {0}

        for stone in stones:
            # Create new achievable sums by including `stone`
            dp |= {s + stone for s in dp if s + stone <= target}

        max_subset_sum = max(dp)
        return total - 2 * max_subset_sum


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [2, 7, 4, 1, 8, 1] -> 1
    assert sol.lastStoneWeightII([2, 7, 4, 1, 8, 1]) == 1, "Test 1 Failed"

    # Test Case 2: [31, 26, 33, 21, 40] -> 5
    assert sol.lastStoneWeightII([31, 26, 33, 21, 40]) == 5, "Test 2 Failed"

    # Test Case 3: Perfectly cancelable [2, 2] -> 0
    assert sol.lastStoneWeightII([2, 2]) == 0, "Test 3 Failed"

    # Test Case 4: Single stone [7] -> 7
    assert sol.lastStoneWeightII([7]) == 7, "Test 4 Failed"

    # Test Case 5: Odd total [1, 2] -> 1
    assert sol.lastStoneWeightII([1, 2]) == 1, "Test 5 Failed"

    print("All Last Stone Weight II tests passed successfully!")
