/**
 * ====================================================================
 * Problem: 2 Keys Keyboard (LeetCode 650)
 * Difficulty: Medium
 * Topic: Math, Dynamic Programming
 * ====================================================================
 * 
 * There is only one character 'A' on the screen of a notepad. You can
 * perform one of two operations on this notepad for each step:
 * 1. Copy All: You can copy all the characters present on the screen
 *    (a partial copy is not allowed).
 * 2. Paste: You can paste the characters which are copied the last time.
 * 
 * Given an integer n, return the minimum number of operations to get
 * the character 'A' exactly n times on the screen.
 * 
 * Example 1:
 * Input: n = 3
 * Output: 3
 * Explanation: Initially, we have one character 'A'.
 * In step 1, we use Copy All operation.
 * In step 2, we use Paste operation to get 'AA'.
 * In step 3, we use Paste operation to get 'AAA'.
 * 
 * Example 2:
 * Input: n = 1
 * Output: 0
 * 
 * Constraints:
 * - 1 <= n <= 1000
 * ====================================================================
 */

/**
 * Calculates minimum operations to produce n characters.
 * Every multiplication factor d of n requires 1 Copy All + (d - 1) Pastes = d operations.
 * Therefore, min operations equals the sum of prime factors of n.
 * 
 * Complexity:
 * - Time: O(sqrt(N)) trial division for prime factorization
 * - Space: O(1) auxiliary space
 * 
 * @param {number} n
 * @return {number}
 */
function minSteps(n) {
    if (n === 1) return 0;

    let steps = 0;
    let factor = 2;

    while (n > 1) {
        while (n % factor === 0) {
            steps += factor;
            n = Math.floor(n / factor);
        }
        factor++;
        // Optimization: if factor * factor > n and n > 1, n is prime
        if (factor * factor > n) {
            if (n > 1) {
                steps += n;
                break;
            }
        }
    }

    return steps;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: n = 3 -> 3 (prime)
    console.assert(minSteps(3) === 3, "Test 1 Failed: expected 3");

    // Test 2: n = 1 -> 0
    console.assert(minSteps(1) === 0, "Test 2 Failed: expected 0");

    // Test 3: n = 6 -> 2 + 3 = 5
    console.assert(minSteps(6) === 5, "Test 3 Failed: expected 5");

    // Test 4: n = 9 -> 3 + 3 = 6
    console.assert(minSteps(9) === 6, "Test 4 Failed: expected 6");

    // Test 5: n = 12 -> 2 + 2 + 3 = 7
    console.assert(minSteps(12) === 7, "Test 5 Failed: expected 7");

    // Test 6: Large prime n = 997 -> 997
    console.assert(minSteps(997) === 997, "Test 6 Failed: expected 997");

    console.log("All 2 Keys Keyboard tests passed successfully!");
}

module.exports = { minSteps };
