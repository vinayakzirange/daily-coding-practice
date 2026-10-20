/**
 * ====================================================================
 * Problem: Integer Break (LeetCode 343)
 * Difficulty: Medium
 * Topic: Math, Dynamic Programming
 * ====================================================================
 * 
 * Given an integer n, break it into the sum of k positive integers,
 * where k >= 2, and maximize the product of those integers.
 * 
 * Return the maximum product you can get.
 * 
 * Example 1:
 * Input: n = 2
 * Output: 1
 * Explanation: 2 = 1 + 1, 1 x 1 = 1.
 * 
 * Example 2:
 * Input: n = 10
 * Output: 36
 * Explanation: 10 = 3 + 3 + 4, 3 x 3 x 4 = 36.
 * 
 * Constraints:
 * - 2 <= n <= 58
 * ====================================================================
 */

/**
 * Finds maximum product of positive integers summing to n.
 * Mathematical insight:
 * Factors of 3 maximize the product (since e ~ 2.718 is optimal base).
 * Any factor >= 4 can be broken into 2 + 2 or 3 + 1 to yield an equal or larger product.
 * - If n == 2: return 1 (1 + 1)
 * - If n == 3: return 2 (1 + 2)
 * - For n > 3: extract 3s until remainder is 4, 3, or 2.
 * 
 * Time Complexity: O(log n) or O(n)
 * Space Complexity: O(1)
 * 
 * @param {number} n
 * @return {number}
 */
function integerBreak(n) {
    if (n === 2) return 1;
    if (n === 3) return 2;

    let product = 1;
    while (n > 4) {
        product *= 3;
        n -= 3;
    }
    product *= n;

    return product;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: n = 2 -> 1
    console.assert(integerBreak(2) === 1, "Test 1 failed");
    console.log(`Test 1 Passed: n=2 -> ${integerBreak(2)}`);

    // Test 2: n = 3 -> 2
    console.assert(integerBreak(3) === 2, "Test 2 failed");
    console.log(`Test 2 Passed: n=3 -> ${integerBreak(3)}`);

    // Test 3: n = 4 -> 4 (2 * 2)
    console.assert(integerBreak(4) === 4, "Test 3 failed");
    console.log(`Test 3 Passed: n=4 -> ${integerBreak(4)}`);

    // Test 4: n = 10 -> 36 (3 * 3 * 4)
    console.assert(integerBreak(10) === 36, "Test 4 failed");
    console.log(`Test 4 Passed: n=10 -> ${integerBreak(10)}`);

    // Test 5: n = 8 -> 18 (3 * 3 * 2)
    console.assert(integerBreak(8) === 18, "Test 5 failed");
    console.log(`Test 5 Passed: n=8 -> ${integerBreak(8)}`);

    // Test 6: Max constraint n = 58
    const r58 = integerBreak(58);
    // 58 = 3 * 18 + 4 -> 3^18 * 4 = 387420489 * 4 = 1549681956
    console.assert(r58 === 1549681956, `Test 6 failed: ${r58}`);
    console.log(`Test 6 Passed: n=58 -> ${r58}`);

    console.log("\nAll Integer Break tests passed successfully!");
}

module.exports = { integerBreak };
