/**
 * Problem: Coin Change
 * Topic: Dynamic Programming / Unbounded Knapsack
 * Language: JavaScript
 *
 * Approach:
 * Build 1D DP table dp of size (amount + 1) filled with Infinity. Set dp[0] = 0.
 * For each coin, update dp[i] = min(dp[i], dp[i - coin] + 1) for i from coin to amount.
 *
 * Time Complexity: O(amount * N) where N is number of coins
 * Space Complexity: O(amount)
 */

function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Test cases
console.log("coins=[1,2,5], amount=11 ->", coinChange([1, 2, 5], 11)); // 3 (5 + 5 + 1)
console.log("coins=[2], amount=3 ->", coinChange([2], 3)); // -1
