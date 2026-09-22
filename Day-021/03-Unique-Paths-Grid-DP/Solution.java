/**
 * Problem: Unique Paths
 * Topic: 2D Dynamic Programming / Grid Combinatorics
 * Language: Java
 *
 * Approach:
 * Define dp[i][j] as unique paths to reach cell (i, j).
 * Recurrence: dp[i][j] = dp[i-1][j] + dp[i][j-1].
 * Optimize to 1D DP array of size n.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(N)
 */

import java.util.Arrays;

public class Solution {
    public static int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }

    public static void main(String[] args) {
        System.out.println("m=3, n=7 -> " + uniquePaths(3, 7)); // 28
        System.out.println("m=3, n=2 -> " + uniquePaths(3, 2)); // 3
    }
}
