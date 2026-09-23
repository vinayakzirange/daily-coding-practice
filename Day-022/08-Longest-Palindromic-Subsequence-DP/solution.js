/**
 * Problem: Longest Palindromic Subsequence
 * Topic: 2D Dynamic Programming / String Reversal LCS
 * Language: JavaScript
 *
 * Approach:
 * Reverse the string s into s_rev. Longest Palindromic Subsequence of s equals the
 * Longest Common Subsequence (LCS) between s and s_rev.
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */

function longestPalindromeSubseq(s) {
    const sRev = s.split('').reverse().join('');
    const n = s.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === sRev[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[n][n];
}

// Test cases
console.log("'bbbab' ->", longestPalindromeSubseq("bbbab")); // 4 ("bbbb")
console.log("'cbbd' ->", longestPalindromeSubseq("cbbd")); // 2 ("bb")
