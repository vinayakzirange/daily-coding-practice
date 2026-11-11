/**
 * Problem: Remove All Adjacent Duplicates in String II (LeetCode 1209)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent
 * and equal letters from s and removing them, causing the left and the right of the deleted substring
 * to concatenate together.
 * 
 * We repeatedly make k duplicate removals on s until we no longer can.
 * Return the final string after all such duplicate removals have been made.
 * It is guaranteed that the answer is unique.
 * 
 * Example 1:
 *  Input: s = "abcd", k = 2
 *  Output: "abcd"
 * 
 * Example 2:
 *  Input: s = "deeedbbcccbdaa", k = 3
 *  Output: "aa"
 *  Explanation: 
 *   First delete "eee" and "ccc", get "ddbbbdaa"
 *   Then delete "bbb", get "dddaa"
 *   Finally delete "ddd", get "aa"
 * 
 * Example 3:
 *  Input: s = "pbbcggttciiippooaais", k = 2
 *  Output: "ps"
 * 
 * Constraints:
 *  1 <= s.length <= 10^5
 *  2 <= k <= 10^4
 *  s only contains lowercase English letters.
 */

/**
 * Removes k adjacent duplicates repeatedly using a Monotonic Count Stack.
 * 
 * @param {string} s
 * @param {number} k
 * @return {string}
 * 
 * Complexity:
 *  Time: O(N) - Every character is pushed and popped from the stack at most once.
 *  Space: O(N) - Stack stores character and frequency pairs up to N elements.
 */
function removeDuplicates(s, k) {
    const stack = []; // Elements: { char: string, count: number }

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];

        if (stack.length > 0 && stack[stack.length - 1].char === ch) {
            stack[stack.length - 1].count++;
            if (stack[stack.length - 1].count === k) {
                stack.pop();
            }
        } else {
            stack.push({ char: ch, count: 1 });
        }
    }

    let result = '';
    for (const item of stack) {
        result += item.char.repeat(item.count);
    }

    return result;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(removeDuplicates("abcd", 2), "abcd", "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(removeDuplicates("deeedbbcccbdaa", 3), "aa", "Test 2 Failed");

    // Test 3: Example 3
    assert.strictEqual(removeDuplicates("pbbcggttciiippooaais", 2), "ps", "Test 3 Failed");

    // Test 4: Complete elimination
    assert.strictEqual(removeDuplicates("baaaab", 2), "", "Test 4 Failed");

    // Test 5: Single character repeated less than k
    assert.strictEqual(removeDuplicates("aaa", 4), "aaa", "Test 5 Failed");

    console.log("All Remove All Adjacent Duplicates in String II tests passed successfully!");
}

runTests();
