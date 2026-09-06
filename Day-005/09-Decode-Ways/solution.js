/*
 * Problem Name: Decode Ways
 * Problem Statement: A message containing letters from A-Z can be encoded into numbers using the mapping 'A' -> "1", 'B' -> "2" ... 'Z' -> "26".
 * Given a string s containing only digits, return the number of ways to decode it.
 * 
 * Approach: 1D Dynamic Programming. dp[i] is number of ways to decode substring of length i.
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
    let oneDigit = parseInt(s.substring(i - 1, i));
    let twoDigits = parseInt(s.substring(i - 2, i));

    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1];
    }
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[n];
}

console.log("Decode ways for '12':", numDecodings("12")); // Expected: 2 ("AB" or "L")
console.log("Decode ways for '226':", numDecodings("226")); // Expected: 3 ("BZ", "VF", "BBF")
