/**
 * Problem: Coin Change (LeetCode 322)
 * Difficulty: Medium
 * Topic: Dynamic Programming / Array / Breadth-First Search / Unbounded Knapsack
 *
 * Description:
 * You are given an integer array coins representing coins of different denominations
 * and an integer amount representing a total amount of money.
 *
 * Return the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins,
 * return -1.
 *
 * You may assume that you have an infinite number of each kind of coin.
 *
 * Example 1:
 * Input: coins = [1,2,5], amount = 11
 * Output: 3
 * Explanation: 11 = 5 + 5 + 1
 *
 * Example 2:
 * Input: coins = [2], amount = 3
 * Output: -1
 *
 * Example 3:
 * Input: coins = [1], amount = 0
 * Output: 0
 *
 * Constraints:
 * - 1 <= coins.length <= 12
 * - 1 <= coins[i] <= 2^31 - 1
 * - 0 <= amount <= 10^4
 *
 * Complexity Analysis:
 * - Time Complexity: O(amount * n) where n is the number of coin denominations.
 * - Space Complexity: O(amount) for the 1D DP table.
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    if (amount === 0) return 0;

    // dp[i] represents the minimum number of coins needed for amount i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins needed for amount 0

    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            if (dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { coins: [1, 2, 5], amount: 11, expected: 3 },
    { coins: [2], amount: 3, expected: -1 },
    { coins: [1], amount: 0, expected: 0 },
    { coins: [1], amount: 1, expected: 1 },
    { coins: [1], amount: 2, expected: 2 },
    { coins: [186, 419, 83, 408], amount: 6249, expected: 20 },
    { coins: [2, 5, 10, 1], amount: 27, expected: 4 } // 10 + 10 + 5 + 2
];

testCases.forEach((tc, idx) => {
    const result = coinChange(tc.coins, tc.amount);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: amount=${tc.amount}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: coins=[${tc.coins}], amount=${tc.amount} -> min coins = ${result}`);
});

console.log("\nAll Coin Change tests passed successfully!");
