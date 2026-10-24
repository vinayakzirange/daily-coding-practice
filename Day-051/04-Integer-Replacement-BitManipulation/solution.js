/**
 * ====================================================================
 * Problem: Integer Replacement (LeetCode 397)
 * Difficulty: Medium
 * Topic: Dynamic Programming, Greedy, Bit Manipulation, Memoization
 * ====================================================================
 * 
 * Given a positive integer n, you can apply one of the following
 * operations:
 * 1. If n is even, replace n with n / 2.
 * 2. If n is odd, replace n with either n + 1 or n - 1.
 * 
 * Return the minimum number of operations needed for n to become 1.
 * 
 * Example 1:
 * Input: n = 8
 * Output: 3
 * Explanation: 8 -> 4 -> 2 -> 1
 * 
 * Example 2:
 * Input: n = 7
 * Output: 4
 * Explanation: 7 -> 8 -> 4 -> 2 -> 1
 * or 7 -> 6 -> 3 -> 2 -> 1
 * 
 * Example 3:
 * Input: n = 4
 * Output: 2
 * 
 * Constraints:
 * - 1 <= n <= 2^31 - 1
 * ====================================================================
 */

/**
 * Finds minimum steps to reduce n to 1.
 * Bit manipulation greedy strategy:
 * - If n is even: n = n / 2
 * - If n is odd:
 *   - Special case: n === 3: decrement to 2 (3 -> 2 -> 1, 2 steps vs 3 -> 4 -> 2 -> 1, 3 steps)
 *   - For n > 3: if n ends with '11' in binary (n % 4 === 3), incrementing creates a cascade of trailing zeros.
 *   - Otherwise (ends with '01', n % 4 === 1), decrementing creates trailing zeros.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param {number} n
 * @return {number}
 */
function integerReplacement(n) {
    let count = 0;

    // Use BigInt to safely handle 2^31 - 1 + 1 overflow
    let val = BigInt(n);

    while (val > 1n) {
        if (val % 2n === 0n) {
            val = val / 2n;
        } else if (val === 3n) {
            val = 2n;
        } else if (val % 4n === 3n) {
            val = val + 1n;
        } else {
            val = val - 1n;
        }
        count++;
    }

    return count;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: n = 8 -> 3
    console.assert(integerReplacement(8) === 3, "Test 1 failed");
    console.log("Test 1 Passed: 8 -> 3");

    // Test 2: n = 7 -> 4
    console.assert(integerReplacement(7) === 4, "Test 2 failed");
    console.log("Test 2 Passed: 7 -> 4");

    // Test 3: n = 4 -> 2
    console.assert(integerReplacement(4) === 2, "Test 3 failed");
    console.log("Test 3 Passed: 4 -> 2");

    // Test 4: n = 1 -> 0
    console.assert(integerReplacement(1) === 0, "Test 4 failed");
    console.log("Test 4 Passed: 1 -> 0");

    // Test 5: n = 3 -> 2 (special case)
    console.assert(integerReplacement(3) === 2, "Test 5 failed");
    console.log("Test 5 Passed: 3 -> 2");

    // Test 6: Max 32-bit signed int: 2^31 - 1 = 2147483647
    const rMax = integerReplacement(2147483647);
    console.assert(rMax === 32, `Test 6 failed: ${rMax}`);
    console.log(`Test 6 Passed: 2147483647 -> ${rMax}`);

    console.log("\nAll Integer Replacement tests passed successfully!");
}

module.exports = { integerReplacement };
