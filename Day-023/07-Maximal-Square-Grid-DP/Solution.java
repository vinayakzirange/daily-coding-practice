/**
 * Problem: Maximal Square
 * Topic: 2D Grid / Dynamic Programming
 * Language: Java
 *
 * Approach:
 * dp[i][j] represents max side length of square with bottom-right corner at cell (i, j).
 * If matrix[i-1][j-1] == '1', dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).
 * Return maxSide * maxSide.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

public class Solution {
    public static int maximalSquare(char[][] matrix) {
        if (matrix == null || matrix.length == 0) return 0;
        int rows = matrix.length;
        int cols = matrix[0].length;
        int[][] dp = new int[rows + 1][cols + 1];
        int maxSide = 0;

        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = 1 + Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]);
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
            }
        }

        return maxSide * maxSide;
    }

    public static void main(String[] args) {
        char[][] matrix = {
            {'1', '0', '1', '0', '0'},
            {'1', '0', '1', '1', '1'},
            {'1', '1', '1', '1', '1'},
            {'1', '0', '0', '1', '0'}
        };
        System.out.println("Maximal Square Area -> " + maximalSquare(matrix)); // 4
    }
}
