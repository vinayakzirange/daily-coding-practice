"""
====================================================================
Problem: Coin Change II (LeetCode 518)
Difficulty: Medium
Topic: Array, Dynamic Programming, Unbounded Knapsack
====================================================================

You are given an integer array coins representing coins of different
denominations and an integer amount representing a total amount of
money.

Return the number of combinations that make up that amount. If that
amount of money cannot be made up by any combination of the coins,
return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

Example 1:
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.

Example 3:
Input: amount = 10, coins = [10]
Output: 1

Constraints:
- 1 <= coins.length <= 300
- 1 <= coins[i] <= 5000
- All the values of coins are unique.
- 0 <= amount <= 5000
====================================================================
"""

from typing import List

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        """
        Unbounded Knapsack / Combinations count DP.
        dp[i] stores number of combinations to form amount i.
        Outer loop iterates over each coin, and inner loop iterates forward from coin to amount.
        Iterating coins on the outer loop guarantees combination order (avoids permutations).

        Time Complexity: O(len(coins) * amount)
        Space Complexity: O(amount) using 1D DP table
        """
        dp = [0] * (amount + 1)
        dp[0] = 1  # 1 way to make amount 0: choose no coins

        for coin in coins:
            for x in range(coin, amount + 1):
                dp[x] += dp[x - coin]

        return dp[amount]


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: amount = 5, coins = [1, 2, 5] -> 4
    assert solver.change(5, [1, 2, 5]) == 4, "Test 1 failed"
    print("Test 1 Passed: amount=5, coins=[1,2,5] -> 4 combinations")

    # Test 2: amount = 3, coins = [2] -> 0
    assert solver.change(3, [2]) == 0, "Test 2 failed"
    print("Test 2 Passed: amount=3, coins=[2] -> 0 combinations")

    # Test 3: amount = 10, coins = [10] -> 1
    assert solver.change(10, [10]) == 1, "Test 3 failed"
    print("Test 3 Passed: amount=10, coins=[10] -> 1 combination")

    # Test 4: amount = 0, coins = [7] -> 1
    assert solver.change(0, [7]) == 1, "Test 4 failed"
    print("Test 4 Passed: amount=0, coins=[7] -> 1 combination")

    # Test 5: amount = 500, coins = [1, 2, 5] -> 12701
    res5 = solver.change(500, [1, 2, 5])
    assert res5 == 12701, f"Test 5 failed: {res5}"
    print(f"Test 5 Passed: amount=500, coins=[1,2,5] -> {res5}")

    print("\nAll Coin Change II tests passed successfully!")
