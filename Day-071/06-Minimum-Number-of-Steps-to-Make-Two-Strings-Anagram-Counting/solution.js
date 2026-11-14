/**
 * Problem: Minimum Number of Steps to Make Two Strings Anagram (LeetCode 1347)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You are given two strings of the same length s and t. In one step you can choose
 * any character of t and replace it with another character.
 * 
 * Return the minimum number of steps to make t an anagram of s.
 * 
 * An Anagram of a string is a string that contains the same characters with a different
 * (or the same) ordering.
 * 
 * Example 1:
 *  Input: s = "bab", t = "aba"
 *  Output: 1
 *  Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.
 * 
 * Example 2:
 *  Input: s = "leetcode", t = "practice"
 *  Output: 5
 *  Explanation: Replace 'p', 'r', 'a', 'i', 'c' from t with proper characters to make t anagram of s.
 * 
 * Example 3:
 *  Input: s = "anagram", t = "mangaar"
 *  Output: 0
 * 
 * Constraints:
 *  1 <= s.length <= 5 * 10^4
 *  s.length == t.length
 *  s and t consist of lowercase English letters only.
 */

/**
 * Calculates minimum replacements to transform t into an anagram of s using Frequency Counting.
 * 
 * @param {string} s
 * @param {string} t
 * @return {number}
 * 
 * Complexity:
 *  Time: O(N) - Single pass over both strings of length N.
 *  Space: O(1) - Fixed 26-element array for alphabet frequencies.
 */
function minSteps(s, t) {
    const counts = new Int32Array(26);

    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
        counts[t.charCodeAt(i) - 97]--;
    }

    let steps = 0;
    for (let i = 0; i < 26; i++) {
        if (counts[i] > 0) {
            steps += counts[i];
        }
    }

    return steps;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(minSteps("bab", "aba"), 1, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(minSteps("leetcode", "practice"), 5, "Test 2 Failed");

    // Test 3: Example 3 (Already anagrams)
    assert.strictEqual(minSteps("anagram", "mangaar"), 0, "Test 3 Failed");

    // Test 4: Completely distinct strings
    assert.strictEqual(minSteps("abc", "xyz"), 3, "Test 4 Failed");

    // Test 5: Single character identical
    assert.strictEqual(minSteps("z", "z"), 0, "Test 5 Failed");

    console.log("All Minimum Number of Steps to Make Two Strings Anagram tests passed successfully!");
}

runTests();
