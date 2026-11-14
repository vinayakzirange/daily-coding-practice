/**
 * Problem: Number of Substrings Containing All Three Characters (LeetCode 1358)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given a string s consisting only of characters a, b and c.
 * Return the number of substrings containing at least one occurrence of all these characters a, b and c.
 * 
 * Example 1:
 *  Input: s = "abcabc"
 *  Output: 10
 *  Explanation: The substrings containing at least one occurrence of the characters a, b and c are
 *               "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).
 * 
 * Example 2:
 *  Input: s = "aaacb"
 *  Output: 3
 *  Explanation: The substrings containing at least one occurrence of the characters a, b and c are
 *               "aaacb", "aacb" and "acb".
 * 
 * Example 3:
 *  Input: s = "abc"
 *  Output: 1
 * 
 * Constraints:
 *  3 <= s.length <= 5 * 10^4
 *  s only consists of a, b or c characters.
 */

/**
 * Counts substrings containing 'a', 'b', and 'c' using the Last Occurrence Tracking technique.
 * 
 * @param {string} s
 * @return {number}
 * 
 * Complexity:
 *  Time: O(N) - Single pass over the string s.
 *  Space: O(1) - Constant auxiliary space for last seen indices.
 */
function numberOfSubstrings(s) {
    const lastSeen = { a: -1, b: -1, c: -1 };
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        lastSeen[s[i]] = i;

        // Any substring starting between 0 and min(lastSeen['a'], lastSeen['b'], lastSeen['c'])
        // and ending at index i contains at least one of each character.
        const minLast = Math.min(lastSeen.a, lastSeen.b, lastSeen.c);
        if (minLast !== -1) {
            count += minLast + 1;
        }
    }

    return count;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(numberOfSubstrings("abcabc"), 10, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(numberOfSubstrings("aaacb"), 3, "Test 2 Failed");

    // Test 3: Example 3
    assert.strictEqual(numberOfSubstrings("abc"), 1, "Test 3 Failed");

    // Test 4: Missing one character completely
    assert.strictEqual(numberOfSubstrings("aaaaabbbbb"), 0, "Test 4 Failed");

    // Test 5: All characters interleaved
    assert.strictEqual(numberOfSubstrings("acba"), 3, "Test 5 Failed");

    console.log("All Number of Substrings Containing All Three Characters tests passed successfully!");
}

runTests();
