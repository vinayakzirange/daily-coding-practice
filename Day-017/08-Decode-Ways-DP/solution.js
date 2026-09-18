/**
 * Problem: Decode Ways
 * Topic: Dynamic Programming / String Partitioning
 * Language: JavaScript
 *
 * Approach:
 * dp[i] represents number of ways to decode substring s[0...i-1].
 * Single digit s[i-1] is valid if s[i-1] != '0'. Two digits s[i-2...i-1] are valid if between 10 and 26.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function numDecodings(s) {
    if (!s || s[0] === '0') return 0;
    const n = s.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        const oneDigit = parseInt(s.substring(i - 1, i));
        const twoDigits = parseInt(s.substring(i - 2, i));

        if (oneDigit >= 1 && oneDigit <= 9) {
            dp[i] += dp[i - 1];
        }
        if (twoDigits >= 10 && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
}

// Test cases
console.log("'12' ->", numDecodings("12")); // 2 ("AB" or "L")
console.log("'226' ->", numDecodings("226")); // 3 ("BZ", "VF", or "BBF")
console.log("'06' ->", numDecodings("06")); // 0
