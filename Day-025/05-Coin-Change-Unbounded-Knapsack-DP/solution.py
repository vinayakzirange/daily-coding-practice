"""
Problem: Coin Change (LeetCode 322)
Language: Python
Difficulty: Medium
Time Complexity: O(amount * coins.length)
Space Complexity: O(amount)
"""

from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        for i in range(1, amount + 1):
            for coin in coins:
                if coin <= i:
                    dp[i] = min(dp[i], dp[i - coin] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1

if __name__ == "__main__":
    sol = Solution()
    print("Output (amount=11):", sol.coinChange([1, 2, 5], 11))  # 3 (5+5+1)
    print("Output (amount=3, coins=[2]):", sol.coinChange([2], 3))  # -1
