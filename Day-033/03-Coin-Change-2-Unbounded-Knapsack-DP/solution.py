"""
Problem: Coin Change II (LeetCode 518)
Difficulty: Medium
Topic: Dynamic Programming / Unbounded Knapsack / Combinations Counting

Description:
You are given an integer array coins representing coins of different denominations
and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money
cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

Example 1:
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: There are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:
Input: amount = 3, coins = [2]
Output: 0
Explanation: The amount of 3 cannot be made up just with coins of 2.

Example 3:
Input: amount = 10, coins = [10]
Output: 1

Constraints:
  * 1 <= coins.length <= 300
  * 1 <= coins[i] <= 5000
  * All the values of coins are unique.
  * 0 <= amount <= 5000

Complexity:
  * Time Complexity: O(amount * n) where n is len(coins).
  * Space Complexity: O(amount) using 1D DP array.
"""

from typing import List


class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        # dp[i] will store the number of ways to make amount i
        dp = [0] * (amount + 1)
        dp[0] = 1  # Base case: 1 way to make amount 0 (using no coins)

        # Loop through each coin first to ensure combinations, not permutations
        for coin in coins:
            for x in range(coin, amount + 1):
                dp[x] += dp[x - coin]

        return dp[amount]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (5, [1, 2, 5], 4),
        (3, [2], 0),
        (10, [10], 1),
        (0, [1, 2, 5], 1),
        (500, [1, 2, 5], 12701),
    ]

    for idx, (amount, coins, expected) in enumerate(test_cases, 1):
        result = sol.change(amount, coins)
        assert result == expected, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: amount={amount}, coins={coins} -> combinations = {result}")

    print("\nAll Coin Change II tests passed successfully!")
