"""
Problem: Stone Game II (LeetCode 1140)
Difficulty: Medium
Language: Python

Alice and Bob continue their games with piles of stones. There are a number of piles arranged in a row,
and each pile has a positive integer number of stones piles[i]. The objective of the game is to end with the most stones.

Alice and Bob take turns, with Alice starting first. Initially, M = 1.

On each player's turn, that player can take all the stones in the first X remaining piles,
where 1 <= X <= 2M. Then, we set M = max(M, X).

The game continues until all the stones have been taken.
Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

Example 1:
    Input: piles = [2,7,9,4,4]
    Output: 10
    Explanation: If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again.
                 Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles, Bob can take 2 piles,
                 Alice can only get 2 + 7 = 9 piles. So Alice takes one pile initially.

Example 2:
    Input: piles = [1,2,3,4,5,100]
    Output: 104

Constraints:
    1 <= piles.length <= 100
    1 <= piles[i] <= 10^4
"""

from functools import lru_cache
from typing import List


class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        """
        Calculates maximum stones Alice can obtain using Minimax Dynamic Programming with Suffix Sums.
        
        Complexity:
            Time: O(N^3) where N = len(piles) <= 100 - States: (i, M) with i in [0..N], M in [1..N],
                  each state considers up to 2M choices.
            Space: O(N^2) for memoization cache and suffix sums array.
        """
        n = len(piles)
        # Precompute suffix sums: suffix[i] = sum(piles[i:])
        suffix = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix[i] = suffix[i + 1] + piles[i]

        @lru_cache(maxsize=None)
        def dp(i: int, m: int) -> int:
            # If current player can take all remaining piles in one move:
            if i + 2 * m >= n:
                return suffix[i]

            # Current player picks X piles to minimize the stones remaining for the opponent
            max_stones = 0
            for x in range(1, 2 * m + 1):
                # Opponent will get dp(i + x, max(m, x)) from the remainder
                max_stones = max(max_stones, suffix[i] - dp(i + x, max(m, x)))

            return max_stones

        return dp(0, 1)


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.stoneGameII([2, 7, 9, 4, 4]) == 10, f"Test 1 Failed: {sol.stoneGameII([2, 7, 9, 4, 4])}"

    # Test 2: Example 2
    assert sol.stoneGameII([1, 2, 3, 4, 5, 100]) == 104, f"Test 2 Failed: {sol.stoneGameII([1, 2, 3, 4, 5, 100])}"

    # Test 3: Single pile
    assert sol.stoneGameII([15]) == 15, "Test 3 Failed"

    # Test 4: Two piles (Alice can take both since 2 <= 2*M = 2)
    assert sol.stoneGameII([8, 12]) == 20, "Test 4 Failed"

    # Test 5: Three piles
    assert sol.stoneGameII([1, 2, 3]) == 3, f"Test 5 Failed: {sol.stoneGameII([1, 2, 3])}"

    print("All Stone Game II tests passed successfully!")
