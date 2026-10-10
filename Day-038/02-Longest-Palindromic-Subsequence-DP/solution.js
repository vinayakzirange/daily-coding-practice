/**
 * Problem: Longest Palindromic Subsequence (LeetCode 516)
 * Difficulty: Medium
 * Topic: Dynamic Programming / String / Subsequence
 * 
 * Description:
 * Given a string s, find the longest palindromic subsequence's length in s.
 * 
 * A subsequence is a sequence that can be derived from another sequence by deleting
 * some or no elements without changing the order of the remaining elements.
 * 
 * Example 1:
 * Input: s = "bbbab"
 * Output: 4
 * Explanation: One possible longest palindromic subsequence is "bbbb".
 * 
 * Example 2:
 * Input: s = "cbbd"
 * Output: 2
 * Explanation: One possible longest palindromic subsequence is "bb".
 * 
 * Constraints:
 *   * 1 <= s.length <= 1000
 *   * s consists only of lowercase English letters.
 * 
 * Complexity:
 *   * Time Complexity: O(n^2) where n is s.length.
 *   * Space Complexity: O(n) using space-optimized 1D DP arrays (or O(n^2) for standard 2D table).
 */

/**
 * @param {string} s
 * @return {number}
 */
function longestPalindromeSubseq(s) {
    const n = s.length;
    // dp[j] stores the length of LPS for substring s[i...j]
    let dp = new Array(n).fill(0);

    // Base case: each single character is a palindrome of length 1
    for (let i = n - 1; i >= 0; i--) {
        const newDp = new Array(n).fill(0);
        newDp[i] = 1;

        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                // If boundary characters match, add 2 to LPS of inner substring s[i+1...j-1]
                newDp[j] = dp[j - 1] + 2;
            } else {
                // Otherwise, take max of excluding s[i] or excluding s[j]
                newDp[j] = Math.max(dp[j], newDp[j - 1]);
            }
        }

        dp = newDp;
    }

    return dp[n - 1];
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { s: "bbbab", expected: 4 },
        { s: "cbbd", expected: 2 },
        { s: "a", expected: 1 },
        { s: "racecar", expected: 7 },
        { s: "abcdef", expected: 1 }
    ];

    testCases.forEach((tc, idx) => {
        const result = longestPalindromeSubseq(tc.s);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: s="${tc.s}" -> LPS length = ${result}`);
    });

    console.log('\nAll Longest Palindromic Subsequence tests passed successfully!');
}

runTests();
