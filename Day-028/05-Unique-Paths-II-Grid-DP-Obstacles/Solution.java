// Problem: Unique Paths II (LeetCode 63)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(M * N)
// Space Complexity: O(N) or O(M * N)

public class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        if (obstacleGrid == null || obstacleGrid[0][0] == 1) return 0;

        int m = obstacleGrid.length;
        int n = obstacleGrid[0].length;
        int[] dp = new int[n];
        dp[0] = 1;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j] = 0;
                } else if (j > 0) {
                    dp[j] += dp[j - 1];
                }
            }
        }

        return dp[n - 1];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] grid = {
            {0, 0, 0},
            {0, 1, 0},
            {0, 0, 0}
        };
        System.out.println("Unique Paths with Obstacles: " + sol.uniquePathsWithObstacles(grid)); // 2
    }
}
