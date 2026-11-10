/**
 * Problem: Reverse Substrings Between Each Pair of Parentheses (LeetCode 1190)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You are given a string s that consists of lower case English letters and brackets.
 * Reverse the strings in each pair of matching parentheses, starting from the innermost one.
 * Your result should not contain any brackets.
 * 
 * Example 1:
 *  Input: s = "(abcd)"
 *  Output: "dcba"
 * 
 * Example 2:
 *  Input: s = "(u(love)i)"
 *  Output: "iloveu"
 *  Explanation: The substring "love" is reversed first, then the whole string is reversed.
 * 
 * Example 3:
 *  Input: s = "(ed(et(oc))el)"
 *  Output: "leetcode"
 *  Explanation: First, "oc" -> "co". Then "etco" -> "octe". Finally, "edocteel" -> "leetcode".
 * 
 * Constraints:
 *  1 <= s.length <= 2000
 *  s only contains lower case English characters and parentheses.
 *  It is guaranteed that all parentheses are balanced.
 */

/**
 * Reverses substrings within matching parentheses in O(N) linear time using Wormhole Teleportation.
 * 
 * @param {string} s
 * @return {string}
 * 
 * Complexity:
 *  Time: O(N) - Linear two-pass traversal without expensive repeated array reversals.
 *  Space: O(N) - Pair array and stack of size N.
 */
function reverseParentheses(s) {
    const n = s.length;
    const pair = new Int32Array(n);
    const stack = [];

    // Pass 1: Build wormhole lookup between matching '(' and ')'
    for (let i = 0; i < n; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else if (s[i] === ')') {
            const j = stack.pop();
            pair[i] = j;
            pair[j] = i;
        }
    }

    // Pass 2: Traverse string. When encountering a parenthesis, teleport to its partner and reverse direction
    const res = [];
    let curr = 0;
    let dir = 1; // 1 = forward, -1 = backward

    while (curr < n && curr >= 0) {
        if (s[curr] === '(' || s[curr] === ')') {
            curr = pair[curr];
            dir = -dir;
        } else {
            res.push(s[curr]);
        }
        curr += dir;
    }

    return res.join('');
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(reverseParentheses("(abcd)"), "dcba", "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(reverseParentheses("(u(love)i)"), "iloveu", "Test 2 Failed");

    // Test 3: Example 3
    assert.strictEqual(reverseParentheses("(ed(et(oc))el)"), "leetcode", "Test 3 Failed");

    // Test 4: Nested parentheses
    assert.strictEqual(reverseParentheses("a(bcdefghijkl(mno)p)q"), "apmnolkjihgfedcbq", "Test 4 Failed");

    // Test 5: Empty inner content
    assert.strictEqual(reverseParentheses("()"), "", "Test 5 Failed");

    // Test 6: Multiple disjoint parentheses
    assert.strictEqual(reverseParentheses("a(bc)d(ef)g"), "acbdfeg", "Test 6 Failed");

    console.log("All Reverse Substrings Between Each Pair of Parentheses tests passed successfully!");
}

runTests();
