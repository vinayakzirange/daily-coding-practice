/*
 * Problem Name: Edit Distance
 * Problem Statement: Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
 * Allowed operations: Insert a character, Delete a character, Replace a character.
 * 
 * Approach: 2D Dynamic Programming.
 * dp[i][j] represents minimum operations to convert word1[0...i-1] to word2[0...j-1].
 * 
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],    // Delete
          dp[i][j - 1],    // Insert
          dp[i - 1][j - 1] // Replace
        );
      }
    }
  }

  return dp[m][n];
}

console.log("Edit Distance between 'horse' and 'ros':", minDistance("horse", "ros")); // Expected: 3
console.log("Edit Distance between 'intention' and 'execution':", minDistance("intention", "execution")); // Expected: 5
