/*
 * Problem Name: Coin Change
 * Problem Statement: You are given an integer array coins representing coins of different denominations 
 * and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.
 * 
 * Approach: Bottom-Up Dynamic Programming (1D DP Array).
 * dp[i] represents minimum coins needed to make amount i.
 * 
 * Time Complexity: O(amount * number of coins)
 * Space Complexity: O(amount)
 */

function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log("Min coins for amount 11 with [1,2,5]:", coinChange([1, 2, 5], 11)); // Expected: 3 (5 + 5 + 1)
