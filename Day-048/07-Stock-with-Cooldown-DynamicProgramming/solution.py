"""
====================================================================
Problem: Best Time to Buy and Sell Stock with Cooldown (LeetCode 309)
Difficulty: Medium
Topic: Array, Dynamic Programming
====================================================================

You are given an array prices where prices[i] is the price of a given
stock on the ith day.

Find the maximum profit you can achieve. You may complete as many
transactions as you like (i.e., buy one and sell one share of the stock
multiple times) with the following restrictions:
- After you sell your stock, you cannot buy stock on the next day (i.e.,
  cooldown one day).

Note: You may not engage in multiple transactions simultaneously (i.e.,
you must sell the stock before you buy again).

Example 1:
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]

Example 2:
Input: prices = [1]
Output: 0

Constraints:
- 1 <= prices.length <= 5000
- 0 <= prices[i] <= 1000
====================================================================
"""

from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        """
        State Machine Dynamic Programming:
        Three states:
        - hold: max profit when holding a share
          hold[i] = max(hold[i-1], rest[i-1] - prices[i])
        - sold: max profit when just sold a share today
          sold[i] = hold[i-1] + prices[i]
        - rest: max profit when in cooldown or doing nothing without holding
          rest[i] = max(rest[i-1], sold[i-1])

        Time Complexity: O(n) where n = len(prices)
        Space Complexity: O(1) space optimization
        """
        if not prices:
            return 0

        hold = -prices[0]
        sold = 0
        rest = 0

        for price in prices[1:]:
            prev_sold = sold
            sold = hold + price
            hold = max(hold, rest - price)
            rest = max(rest, prev_sold)

        return max(sold, rest)


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [1, 2, 3, 0, 2] -> 3
    assert solver.maxProfit([1, 2, 3, 0, 2]) == 3, "Test 1 failed"
    print("Test 1 Passed: [1, 2, 3, 0, 2] -> 3")

    # Test 2: [1] -> 0
    assert solver.maxProfit([1]) == 0, "Test 2 failed"
    print("Test 2 Passed: [1] -> 0")

    # Test 3: Decreasing prices: [7, 6, 4, 3, 1] -> 0
    assert solver.maxProfit([7, 6, 4, 3, 1]) == 0, "Test 3 failed"
    print("Test 3 Passed: [7, 6, 4, 3, 1] -> 0")

    # Test 4: Two elements with profit: [1, 4] -> 3
    assert solver.maxProfit([1, 4]) == 3, "Test 4 failed"
    print("Test 4 Passed: [1, 4] -> 3")

    # Test 5: Multiple transactions with cooldown: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0] -> 11
    res5 = solver.maxProfit([1, 2, 4, 2, 5, 7, 2, 4, 9, 0])
    assert res5 == 11, f"Test 5 failed: {res5}"
    print(f"Test 5 Passed: [1, 2, 4, ...] -> {res5}")

    print("\nAll Best Time to Buy and Sell Stock with Cooldown tests passed successfully!")
