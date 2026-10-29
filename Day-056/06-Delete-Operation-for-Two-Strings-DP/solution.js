/**
 * ====================================================================
 * Problem: Delete Operation for Two Strings (LeetCode 583)
 * Difficulty: Medium
 * Topic: String, Dynamic Programming
 * ====================================================================
 * 
 * Given two strings word1 and word2, return the minimum number of steps
 * required to make word1 and word2 the same.
 * 
 * In one step, you can delete exactly one character in either string.
 * 
 * Example 1:
 * Input: word1 = "sea", word2 = "eat"
 * Output: 2
 * Explanation: You need one step to make "sea" to "ea" and one step
 * to make "eat" to "ea".
 * 
 * Example 2:
 * Input: word1 = "leetcode", word2 = "etco"
 * Output: 4
 * 
 * Constraints:
 * - 1 <= word1.length, word2.length <= 500
 * - word1 and word2 consist of only lowercase English letters.
 * ====================================================================
 */

/**
 * Calculates minimum deletion steps via Longest Common Subsequence (LCS).
 * Min Deletions = len(word1) + len(word2) - 2 * LCS(word1, word2).
 * 
 * Complexity:
 * - Time: O(M * N) where M = len(word1), N = len(word2)
 * - Space: O(N) using 1D DP array
 * 
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    // dp[j] holds LCS length between word1[0...i-1] and word2[0...j-1]
    const dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        let prevDiagonal = 0; // represents dp[i-1][j-1]

        for (let j = 1; j <= n; j++) {
            const temp = dp[j];

            if (word1[i - 1] === word2[j - 1]) {
                dp[j] = prevDiagonal + 1;
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1]);
            }

            prevDiagonal = temp;
        }
    }

    const lcs = dp[n];
    return m + n - 2 * lcs;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: "sea", "eat" -> 2
    console.assert(minDistance("sea", "eat") === 2, "Test 1 Failed: expected 2");

    // Test 2: "leetcode", "etco" -> 4
    console.assert(minDistance("leetcode", "etco") === 4, "Test 2 Failed: expected 4");

    // Test 3: Identical strings "abc", "abc" -> 0
    console.assert(minDistance("abc", "abc") === 0, "Test 3 Failed: expected 0");

    // Test 4: Completely disjoint "abc", "def" -> 6
    console.assert(minDistance("abc", "def") === 6, "Test 4 Failed: expected 6");

    // Test 5: Single characters
    console.assert(minDistance("a", "b") === 2, "Test 5 Failed: expected 2");
    console.assert(minDistance("a", "a") === 0, "Test 5b Failed: expected 0");

    console.log("All Delete Operation for Two Strings tests passed successfully!");
}

module.exports = { minDistance };
