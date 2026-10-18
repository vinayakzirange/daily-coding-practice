/**
 * ====================================================================
 * Problem: Reverse Words in a String (LeetCode 151)
 * Difficulty: Medium
 * Topic: Two Pointers, String
 * ====================================================================
 * 
 * Given an input string s, reverse the order of the words.
 * 
 * A word is defined as a sequence of non-space characters. The words in
 * s will be separated by at least one space.
 * 
 * Return a string of the words in reverse order concatenated by a single
 * space.
 * 
 * Note that s may contain leading or trailing spaces or multiple spaces
 * between two words. The returned string should only have a single space
 * separating the words. Do not include any extra spaces.
 * 
 * Example 1:
 * Input: s = "the sky is blue"
 * Output: "blue is sky the"
 * 
 * Example 2:
 * Input: s = "  hello world  "
 * Output: "world hello"
 * Explanation: Your reversed string should not contain leading or trailing spaces.
 * 
 * Example 3:
 * Input: s = "a good   example"
 * Output: "example good a"
 * Explanation: You need to reduce multiple spaces between two words to a single space.
 * 
 * Constraints:
 * - 1 <= s.length <= 10^4
 * - s contains English letters (upper-case and lower-case), digits, and spaces ' '.
 * - There is at least one word in s.
 * ====================================================================
 */

/**
 * Reverses words in string with single space separator.
 * Implemented using clean two-pointer right-to-left scan.
 * 
 * Time Complexity: O(n) where n is the length of s
 * Space Complexity: O(n) to construct resulting reversed words array
 * 
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
    const words = [];
    let i = s.length - 1;

    while (i >= 0) {
        // Skip trailing or intermediate spaces
        while (i >= 0 && s[i] === ' ') {
            i--;
        }
        if (i < 0) break;

        // Find start of word
        let j = i;
        while (i >= 0 && s[i] !== ' ') {
            i--;
        }

        // Substring [i + 1, j + 1)
        words.push(s.slice(i + 1, j + 1));
    }

    return words.join(' ');
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Standard sentence
    const t1 = "the sky is blue";
    console.assert(reverseWords(t1) === "blue is sky the", "Test 1 failed");
    console.log(`Test 1 Passed: "${t1}" -> "${reverseWords(t1)}"`);

    // Test 2: Leading and trailing spaces
    const t2 = "  hello world  ";
    console.assert(reverseWords(t2) === "world hello", "Test 2 failed");
    console.log(`Test 2 Passed: "${t2}" -> "${reverseWords(t2)}"`);

    // Test 3: Multiple spaces between words
    const t3 = "a good   example";
    console.assert(reverseWords(t3) === "example good a", "Test 3 failed");
    console.log(`Test 3 Passed: "${t3}" -> "${reverseWords(t3)}"`);

    // Test 4: Single word with spaces
    const t4 = "   Antigravity   ";
    console.assert(reverseWords(t4) === "Antigravity", "Test 4 failed");
    console.log(`Test 4 Passed: "${t4}" -> "${reverseWords(t4)}"`);

    // Test 5: Single word without spaces
    const t5 = "word";
    console.assert(reverseWords(t5) === "word", "Test 5 failed");
    console.log(`Test 5 Passed: "${t5}" -> "${reverseWords(t5)}"`);

    // Test 6: Multiple words with varying spaces
    const t6 = "  Bob    Loves  Alice   ";
    console.assert(reverseWords(t6) === "Alice Loves Bob", "Test 6 failed");
    console.log(`Test 6 Passed: "${t6}" -> "${reverseWords(t6)}"`);

    console.log("\nAll Reverse Words in a String tests passed successfully!");
}

module.exports = { reverseWords };
