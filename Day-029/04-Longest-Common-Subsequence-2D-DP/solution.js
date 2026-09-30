// Problem: Longest Common Subsequence (LeetCode 1143)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(M * N)
// Space Complexity: O(M * N)

function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

// Test cases
console.log("LCS ('abcde', 'ace'):", longestCommonSubsequence("abcde", "ace")); // 3 ("ace")
console.log("LCS ('abc', 'abc'):", longestCommonSubsequence("abc", "abc")); // 3
console.log("LCS ('abc', 'def'):", longestCommonSubsequence("abc", "def")); // 0
