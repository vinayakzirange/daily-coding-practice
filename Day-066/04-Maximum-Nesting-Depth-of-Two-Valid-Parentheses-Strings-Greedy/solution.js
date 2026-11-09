/**
 * Problem: Maximum Nesting Depth of Two Valid Parentheses Strings (LeetCode 1111)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * A string is a valid parentheses string (VPS) if it meets one of the following:
 *  - It is empty "", or
 *  - It can be written as AB (A concatenated with B), where A and B are VPS's, or
 *  - It can be written as (A), where A is a VPS.
 * 
 * Given a VPS seq, split it into two disjoint subsequences A and B, such that
 * max(depth(A), depth(B)) is the minimum possible to achieve.
 * 
 * Return an answer array (where answer[i] is 0 if seq[i] belongs to A, and 1 if seq[i] belongs to B).
 * 
 * Example 1:
 *  Input: seq = "(()())"
 *  Output: [0,1,1,1,1,0] (or any valid split with minimum max-depth)
 * 
 * Example 2:
 *  Input: seq = "()(())()"
 *  Output: [0,0,0,1,1,0,0,0]
 * 
 * Constraints:
 *  1 <= seq.length <= 10000
 */

/**
 * Splits a VPS into two subsequences A and B minimizing max(depth(A), depth(B)).
 * 
 * @param {string} seq
 * @return {number[]}
 * 
 * Complexity:
 *  Time: O(N) - Single pass over the input string of length N.
 *  Space: O(1) auxiliary space (excluding the returned result array).
 */
function maxDepthAfterSplit(seq) {
    const ans = new Array(seq.length);
    let depth = 0;

    for (let i = 0; i < seq.length; i++) {
        if (seq[i] === '(') {
            ans[i] = depth % 2;
            depth++;
        } else {
            depth--;
            ans[i] = depth % 2;
        }
    }

    return ans;
}

// ==========================================
// Test Cases & Validation
// ==========================================
function getDepth(str) {
    let d = 0;
    let maxD = 0;
    for (const ch of str) {
        if (ch === '(') d++;
        else d--;
        maxD = Math.max(maxD, d);
    }
    return maxD;
}

function isValidSplit(seq, ans) {
    let s0 = '';
    let s1 = '';
    for (let i = 0; i < seq.length; i++) {
        if (ans[i] === 0) s0 += seq[i];
        else s1 += seq[i];
    }
    const dSeq = getDepth(seq);
    const d0 = getDepth(s0);
    const d1 = getDepth(s1);
    const maxSubDepth = Math.max(d0, d1);
    const optimalDepth = Math.ceil(dSeq / 2);
    return maxSubDepth <= optimalDepth;
}

function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const seq1 = "(()())";
    const res1 = maxDepthAfterSplit(seq1);
    assert.strictEqual(isValidSplit(seq1, res1), true, "Test 1 Failed");

    // Test 2: Example 2
    const seq2 = "()(())()";
    const res2 = maxDepthAfterSplit(seq2);
    assert.strictEqual(isValidSplit(seq2, res2), true, "Test 2 Failed");

    // Test 3: Deeply nested
    const seq3 = "(((())))";
    const res3 = maxDepthAfterSplit(seq3);
    assert.strictEqual(isValidSplit(seq3, res3), true, "Test 3 Failed");

    // Test 4: Single pair
    const seq4 = "()";
    const res4 = maxDepthAfterSplit(seq4);
    assert.strictEqual(isValidSplit(seq4, res4), true, "Test 4 Failed");

    // Test 5: Consecutive simple pairs
    const seq5 = "()()()";
    const res5 = maxDepthAfterSplit(seq5);
    assert.strictEqual(isValidSplit(seq5, res5), true, "Test 5 Failed");

    console.log("All Maximum Nesting Depth of Two VPS tests passed successfully!");
}

runTests();
