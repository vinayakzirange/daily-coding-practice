/**
 * Problem: Number of Dice Rolls With Target Sum (LeetCode 1155)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You have n dice, and each die has k faces numbered from 1 to k.
 * Given three integers n, k, and target, return the number of possible ways (out of the k^n total ways)
 * to roll the dice, so the sum of the face-up numbers equals target.
 * Since the answer may be too large, return it modulo 10^9 + 7.
 * 
 * Example 1:
 *  Input: n = 1, k = 6, target = 3
 *  Output: 1
 *  Explanation: You throw one die with 6 faces. There is only 1 way to get a sum of 3.
 * 
 * Example 2:
 *  Input: n = 2, k = 6, target = 7
 *  Output: 6
 *  Explanation: You throw two dice, each with 6 faces. There are 6 ways to get a sum of 7:
 *               1+6, 2+5, 3+4, 4+3, 5+2, 6+1.
 * 
 * Example 3:
 *  Input: n = 30, k = 30, target = 500
 *  Output: 222616187
 * 
 * Constraints:
 *  1 <= n, k <= 30
 *  1 <= target <= 1000
 */

/**
 * Computes the number of ways to roll n dice with k faces to achieve the target sum.
 * 
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 * 
 * Complexity:
 *  Time: O(n * target * k) - At most 30 * 1000 * 30 = 900,000 iterations.
 *  Space: O(target) - 1D rolling array for DP state.
 */
function numRollsToTarget(n, k, target) {
    // Impossible if minimum sum (n * 1) > target or maximum sum (n * k) < target
    if (target < n || target > n * k) return 0;

    const MOD = 1_000_000_007;
    // dp[s] represents the number of ways to reach sum s with current number of dice
    let dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (let dice = 1; dice <= n; dice++) {
        const nextDp = new Array(target + 1).fill(0);
        const minPossible = dice;
        const maxPossible = Math.min(target, dice * k);

        for (let s = minPossible; s <= maxPossible; s++) {
            let sumWays = 0;
            for (let face = 1; face <= k; face++) {
                if (s >= face) {
                    sumWays = (sumWays + dp[s - face]) % MOD;
                } else {
                    break;
                }
            }
            nextDp[s] = sumWays;
        }

        dp = nextDp;
    }

    return dp[target];
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(numRollsToTarget(1, 6, 3), 1, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(numRollsToTarget(2, 6, 7), 6, "Test 2 Failed");

    // Test 3: Example 3
    assert.strictEqual(numRollsToTarget(30, 30, 500), 222616187, "Test 3 Failed");

    // Test 4: Impossible target too small
    assert.strictEqual(numRollsToTarget(3, 6, 2), 0, "Test 4 Failed");

    // Test 5: Impossible target too large
    assert.strictEqual(numRollsToTarget(2, 6, 13), 0, "Test 5 Failed");

    // Test 6: Exact boundary min / max
    assert.strictEqual(numRollsToTarget(3, 4, 3), 1, "Test 6 Min Failed");
    assert.strictEqual(numRollsToTarget(3, 4, 12), 1, "Test 6 Max Failed");

    console.log("All Number of Dice Rolls With Target Sum tests passed successfully!");
}

runTests();

