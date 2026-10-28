/**
 * ====================================================================
 * Problem: Next Greater Element III (LeetCode 556)
 * Difficulty: Medium
 * Topic: Math, Two Pointers, String
 * ====================================================================
 * 
 * Given a positive 32-bit integer n, find the smallest integer which
 * has exactly the same digits existing in the integer n and is greater
 * in value than n. If no such positive 32-bit integer exists, return -1.
 * 
 * Note that the returned integer should fit in 32-bit integer, if there
 * is a valid answer but it does not fit in 32-bit integer, return -1.
 * 
 * Example 1:
 * Input: n = 12
 * Output: 21
 * 
 * Example 2:
 * Input: n = 21
 * Output: -1
 * 
 * Constraints:
 * - 1 <= n <= 2^31 - 1
 * ====================================================================
 */

/**
 * Computes the next lexicographical permutation of the digits.
 * 
 * Steps:
 * 1. Find pivot i from right where digits[i] < digits[i+1].
 * 2. Find successor j from right where digits[j] > digits[i].
 * 3. Swap digits[i] and digits[j].
 * 4. Reverse subarray from i+1 to end.
 * 5. Verify 32-bit signed integer limit (<= 2^31 - 1).
 * 
 * Complexity:
 * - Time: O(D) where D <= 10 is number of digits (O(1) effectively)
 * - Space: O(D) for digit array
 * 
 * @param {number} n
 * @return {number}
 */
function nextGreaterElement(n) {
    const MAX_32_BIT_INT = 2147483647;
    const digits = String(n).split("");
    const len = digits.length;

    // Step 1: Find first decreasing digit from right
    let i = len - 2;
    while (i >= 0 && digits[i] >= digits[i + 1]) {
        i--;
    }

    // If all digits are in non-increasing order, no greater permutation exists
    if (i < 0) {
        return -1;
    }

    // Step 2: Find digit to the right of i that is smallest but strictly larger than digits[i]
    let j = len - 1;
    while (digits[j] <= digits[i]) {
        j--;
    }

    // Step 3: Swap digits[i] and digits[j]
    [digits[i], digits[j]] = [digits[j], digits[i]];

    // Step 4: Reverse the suffix from index i + 1 to the end
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
        [digits[left], digits[right]] = [digits[right], digits[left]];
        left++;
        right--;
    }

    const result = Number(digits.join(""));
    return result <= MAX_32_BIT_INT ? result : -1;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: 12 -> 21
    console.assert(nextGreaterElement(12) === 21, "Test 1 Failed: expected 21");

    // Test 2: 21 -> -1 (already descending)
    console.assert(nextGreaterElement(21) === -1, "Test 2 Failed: expected -1");

    // Test 3: 1234 -> 1243
    console.assert(nextGreaterElement(1234) === 1243, "Test 3 Failed: expected 1243");

    // Test 4: 230241 -> 230412
    console.assert(nextGreaterElement(230241) === 230412, "Test 4 Failed: expected 230412");

    // Test 5: Overflow beyond 32-bit int: 2147483486 -> overflow -> -1
    console.assert(nextGreaterElement(2147483486) === -1, "Test 5 Failed: expected -1 on overflow");

    console.log("All Next Greater Element III tests passed successfully!");
}

module.exports = { nextGreaterElement };
