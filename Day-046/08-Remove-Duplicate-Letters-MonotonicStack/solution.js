/**
 * ====================================================================
 * Problem: Remove Duplicate Letters (LeetCode 316)
 * Difficulty: Medium
 * Topic: String, Stack, Greedy, Monotonic Stack
 * ====================================================================
 * 
 * Given a string s, remove duplicate letters so that every letter appears
 * once and only once. You must make sure your result is the smallest in
 * lexicographical order among all possible results.
 * 
 * Example 1:
 * Input: s = "bcabc"
 * Output: "abc"
 * 
 * Example 2:
 * Input: s = "cbacdcbc"
 * Output: "acdb"
 * 
 * Constraints:
 * - 1 <= s.length <= 10^4
 * - s consists of lowercase English letters.
 * 
 * Note: This question is the same as LeetCode 1081: Smallest Subsequence
 * of Distinct Characters.
 * ====================================================================
 */

/**
 * Finds smallest lexicographical string with all unique characters of s.
 * Uses Monotonic Stack + Greedy strategy with character frequency/last occurrence tracking.
 * 
 * Time Complexity: O(n) where n = s.length
 * Space Complexity: O(1) auxiliary space (at most 26 lowercase English letters)
 * 
 * @param {string} s
 * @return {string}
 */
function removeDuplicateLetters(s) {
    // Record last occurrence index of each character
    const lastIndex = new Map();
    for (let i = 0; i < s.length; i++) {
        lastIndex.set(s[i], i);
    }

    const seen = new Set();
    const stack = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // If char is already selected in our answer, skip it
        if (seen.has(char)) {
            continue;
        }

        // Monotonic stack: pop characters larger than current char
        // provided they appear again later in the string
        while (
            stack.length > 0 &&
            stack[stack.length - 1] > char &&
            lastIndex.get(stack[stack.length - 1]) > i
        ) {
            seen.delete(stack.pop());
        }

        stack.push(char);
        seen.add(char);
    }

    return stack.join('');
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: "bcabc" -> "abc"
    const t1 = "bcabc";
    console.assert(removeDuplicateLetters(t1) === "abc", "Test 1 failed");
    console.log(`Test 1 Passed: "${t1}" -> "${removeDuplicateLetters(t1)}"`);

    // Test 2: "cbacdcbc" -> "acdb"
    const t2 = "cbacdcbc";
    console.assert(removeDuplicateLetters(t2) === "acdb", "Test 2 failed");
    console.log(`Test 2 Passed: "${t2}" -> "${removeDuplicateLetters(t2)}"`);

    // Test 3: Already distinct and sorted
    const t3 = "abc";
    console.assert(removeDuplicateLetters(t3) === "abc", "Test 3 failed");
    console.log(`Test 3 Passed: "${t3}" -> "${removeDuplicateLetters(t3)}"`);

    // Test 4: Reverse order
    const t4 = "cba";
    console.assert(removeDuplicateLetters(t4) === "cba", "Test 4 failed");
    console.log(`Test 4 Passed: "${t4}" -> "${removeDuplicateLetters(t4)}"`);

    // Test 5: Complex repeat
    const t5 = "abacb";
    // Candidate answers: "abc", "acb" -> "abc" is smaller
    console.assert(removeDuplicateLetters(t5) === "abc", "Test 5 failed");
    console.log(`Test 5 Passed: "${t5}" -> "${removeDuplicateLetters(t5)}"`);

    // Test 6: Single character
    const t6 = "z";
    console.assert(removeDuplicateLetters(t6) === "z", "Test 6 failed");
    console.log(`Test 6 Passed: "${t6}" -> "${removeDuplicateLetters(t6)}"`);

    console.log("\nAll Remove Duplicate Letters tests passed successfully!");
}

module.exports = { removeDuplicateLetters };
