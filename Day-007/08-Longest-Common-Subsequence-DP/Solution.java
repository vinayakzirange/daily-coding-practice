/*
 * Problem Name: Longest Common Subsequence
 * Problem Statement: Given two strings text1 and text2, return the length of their longest common subsequence. 
 * If there is no common subsequence, return 0.
 * 
 * Approach: 2D Dynamic Programming.
 * dp[i][j] = 1 + dp[i-1][j-1] if text1[i-1] == text2[j-1], else Math.max(dp[i-1][j], dp[i][j-1]).
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
        String text1 = "abcde";
        String text2 = "ace";
        System.out.println("LCS Length: " + longestCommonSubsequence(text1, text2)); // Expected: 3 ("ace")
    }
}
