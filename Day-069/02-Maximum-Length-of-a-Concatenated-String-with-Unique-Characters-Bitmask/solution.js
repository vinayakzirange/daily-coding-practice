/**
 * Problem: Maximum Length of a Concatenated String with Unique Characters (LeetCode 1239)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You are given an array of strings arr. A string s is formed by the concatenation
 * of a subsequence of arr that has unique characters.
 * 
 * Return the maximum possible length of s.
 * 
 * A subsequence is an array that can be derived from another array by deleting some
 * or no elements without changing the order of the remaining elements.
 * 
 * Example 1:
 *  Input: arr = ["un","iq","ue"]
 *  Output: 4
 *  Explanation: All the valid combinations are "", "un", "iq", "ue", "uniq" and "ique".
 *               Maximum length is 4.
 * 
 * Example 2:
 *  Input: arr = ["cha","r","act","ers"]
 *  Output: 6
 *  Explanation: Possible longest valid strings are "chaers" and "acters".
 * 
 * Example 3:
 *  Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
 *  Output: 26
 * 
 * Constraints:
 *  1 <= arr.length <= 16
 *  1 <= arr[i].length <= 26
 *  arr[i] contains only lowercase English letters.
 */

/**
 * Finds the maximum length of concatenated string with unique characters using Bitmask DP.
 * 
 * @param {string[]} arr
 * @return {number}
 * 
 * Complexity:
 *  Time: O(2^N) where N <= 16 - Fast bitwise operations on combinations.
 *  Space: O(2^N) - Stores visited bitmasks.
 */
function maxLength(arr) {
    // dp stores all valid bitmasks formed so far (starting with 0 representing empty string)
    const dp = [0];
    let maxLen = 0;

    for (const word of arr) {
        let mask = 0;
        let hasDuplicate = false;

        // Convert word into a 26-bit mask
        for (let i = 0; i < word.length; i++) {
            const bit = 1 << (word.charCodeAt(i) - 97);
            if ((mask & bit) !== 0) {
                hasDuplicate = true; // Duplicate character within the word itself
                break;
            }
            mask |= bit;
        }

        if (hasDuplicate) continue;

        // Try combining this word with every valid combination seen so far
        const currentSize = dp.length;
        for (let j = 0; j < currentSize; j++) {
            const prevMask = dp[j];
            if ((prevMask & mask) === 0) {
                const combined = prevMask | mask;
                dp.push(combined);
                maxLen = Math.max(maxLen, countBits(combined));
            }
        }
    }

    return maxLen;
}

function countBits(n) {
    let count = 0;
    while (n > 0) {
        count += (n & 1);
        n >>>= 1;
    }
    return count;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(maxLength(["un", "iq", "ue"]), 4, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(maxLength(["cha", "r", "act", "ers"]), 6, "Test 2 Failed");

    // Test 3: Example 3
    assert.strictEqual(maxLength(["abcdefghijklmnopqrstuvwxyz"]), 26, "Test 3 Failed");

    // Test 4: Internal duplicates in strings
    assert.strictEqual(maxLength(["aa", "bb"]), 0, "Test 4 Failed");

    // Test 5: Disjoint words
    assert.strictEqual(maxLength(["a", "b", "c", "d"]), 4, "Test 5 Failed");

    // Test 6: Overlapping words
    assert.strictEqual(maxLength(["ab", "bc", "cd", "de"]), 4, "Test 6 Failed");

    console.log("All Maximum Length of a Concatenated String tests passed successfully!");
}

runTests();
