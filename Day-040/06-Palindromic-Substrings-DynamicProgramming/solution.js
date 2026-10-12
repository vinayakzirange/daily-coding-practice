/**
 * Problem: Palindromic Substrings (LeetCode 647)
 * Difficulty: Medium
 * Topic: Two Pointers / String / Dynamic Programming
 *
 * Description:
 * Given a string s, return the number of palindromic substrings in it.
 * A string is a palindrome when it reads the same backward as forward.
 * A substring is a contiguous sequence of characters within the string.
 *
 * Example 1:
 * Input: s = "abc"
 * Output: 3
 * Explanation: Three palindromic strings: "a", "b", "c".
 *
 * Example 2:
 * Input: s = "aaa"
 * Output: 6
 * Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 *
 * Constraints:
 * - 1 <= s.length <= 1000
 * - s consists of lowercase English letters.
 *
 * Complexity Analysis:
 * - Time Complexity: O(n^2) where n is the length of s. Expanding from each of 2n - 1 centers takes O(n).
 * - Space Complexity: O(1) auxiliary space.
 */

/**
 * @param {string} s
 * @return {number}
 */
function countSubstrings(s) {
    let count = 0;

    function expandAroundCenter(left, right) {
        let palindromes = 0;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            palindromes++;
            left--;
            right++;
        }
        return palindromes;
    }

    for (let i = 0; i < s.length; i++) {
        // Odd length palindromes centered at i
        count += expandAroundCenter(i, i);
        // Even length palindromes centered between i and i + 1
        count += expandAroundCenter(i, i + 1);
    }

    return count;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { s: "abc", expected: 3 },
    { s: "aaa", expected: 6 },
    { s: "a", expected: 1 },
    { s: "racecar", expected: 10 }, // "r","a","c","e","c","a","r", "cec", "aceca", "racecar"
    { s: "abacaba", expected: 12 },
    { s: "fdsklf", expected: 6 },
];

testCases.forEach((tc, idx) => {
    const result = countSubstrings(tc.s);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: s="${tc.s}", got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: s="${tc.s}" -> palindromic substrings = ${result}`);
});

console.log("\nAll Palindromic Substrings tests passed successfully!");
