/**
 * Problem: Longest Common Subsequence (LCS)
 * Topic: 2D Dynamic Programming / String Matching
 * Language: Java
 *
 * Approach:
 * Build 2D DP table dp[i][j] representing LCS of text1[0...i-1] and text2[0...j-1].
 * If characters match: dp[i][j] = 1 + dp[i-1][j-1].
 * Otherwise: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

public class Solution {
    public static int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        System.out.println("LCS ('abcde', 'ace') -> " + longestCommonSubsequence("abcde", "ace")); // 3 ("ace")
        System.out.println("LCS ('abc', 'abc') -> " + longestCommonSubsequence("abc", "abc")); // 3
        System.out.println("LCS ('abc', 'def') -> " + longestCommonSubsequence("abc", "def")); // 0
    }
}
