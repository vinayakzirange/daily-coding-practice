/*
 * Problem Name: Coin Change II
 * Problem Statement: You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
 * Return the number of combinations that make up that amount. You may assume that you have an infinite number of each kind of coin.
 * 
 * Approach: Dynamic Programming. dp[i] represents number of combinations to make amount i.
 * Loop coins outside and amounts inside to avoid duplicate permutations.
 * 
 * Time Complexity: O(N * Amount)
 * Space Complexity: O(Amount)
 */

function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
}

console.log("Combinations for amount 5 with [1, 2, 5]:", change(5, [1, 2, 5])); // Expected: 4
