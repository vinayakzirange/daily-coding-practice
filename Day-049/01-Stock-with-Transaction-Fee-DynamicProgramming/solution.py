"""
====================================================================
Problem: Best Time to Buy and Sell Stock with Transaction Fee (LeetCode 714)
Difficulty: Medium
Topic: Array, Dynamic Programming, Greedy
====================================================================

You are given an array prices where prices[i] is the price of a given
stock on the ith day, and an integer fee representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many
transactions as you like, but you need to pay the transaction fee for
each transaction.

Note:
- You may not engage in multiple transactions simultaneously (i.e., you
  must sell the stock before you buy again).
- The transaction fee is only charged once per transaction (applied either
  at buy or sell).

Example 1:
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 5 + 3 = 8.

Example 2:
Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6

Constraints:
- 1 <= prices.length <= 5 * 10^4
- 1 <= prices[i] <= 5 * 10^4
- 0 <= fee <= 5 * 10^4
====================================================================
"""

from typing import List

class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        """
        Dynamic Programming with State Optimization:
        - hold: maximum profit on day i holding 1 share
          hold = max(hold, cash - prices[i])
        - cash: maximum profit on day i holding 0 shares
          cash = max(cash, hold + prices[i] - fee)

        Time Complexity: O(n) where n = len(prices)
        Space Complexity: O(1) auxiliary space
        """
        if not prices:
            return 0

        cash = 0
        hold = -prices[0]

        for price in prices[1:]:
            cash = max(cash, hold + price - fee)
            hold = max(hold, cash - price)

        return cash


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [1, 3, 2, 8, 4, 9], fee = 2 -> 8
    p1 = [1, 3, 2, 8, 4, 9]
    assert solver.maxProfit(p1, 2) == 8, "Test 1 failed"
    print(f"Test 1 Passed: {p1}, fee=2 -> 8")

    # Test 2: [1, 3, 7, 5, 10, 3], fee = 3 -> 6
    p2 = [1, 3, 7, 5, 10, 3]
    assert solver.maxProfit(p2, 3) == 6, "Test 2 failed"
    print(f"Test 2 Passed: {p2}, fee=3 -> 6")

    # Test 3: Fee higher than any profit
    p3 = [1, 2, 3]
    assert solver.maxProfit(p3, 5) == 0, "Test 3 failed"
    print(f"Test 3 Passed: {p3}, fee=5 -> 0")

    # Test 4: Decreasing prices: no profit possible
    p4 = [9, 8, 5, 3, 1]
    assert solver.maxProfit(p4, 1) == 0, "Test 4 failed"
    print(f"Test 4 Passed: {p4}, fee=1 -> 0")

    # Test 5: Single day
    p5 = [5]
    assert solver.maxProfit(p5, 2) == 0, "Test 5 failed"
    print(f"Test 5 Passed: {p5}, fee=2 -> 0")

    # Test 6: Zero fee
    p6 = [1, 3, 2, 8]
    # Profit: (3-1) + (8-2) = 2 + 6 = 8
    assert solver.maxProfit(p6, 0) == 8, "Test 6 failed"
    print(f"Test 6 Passed: {p6}, fee=0 -> 8")

    print("\nAll Stock with Transaction Fee tests passed successfully!")
