// Problem: Longest Increasing Path in a Matrix (LeetCode 329)
// Language: Java
// Difficulty: Hard / Medium-Hard
// Time Complexity: O(M * N)
// Space Complexity: O(M * N)

public class Solution {
    private static final int[][] DIRS = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

    public int longestIncreasingPath(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return 0;
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] memo = new int[m][n];
        int maxLen = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxLen = Math.max(maxLen, dfs(matrix, i, j, memo));
            }
        }

        return maxLen;
    }

    private int dfs(int[][] matrix, int r, int c, int[][] memo) {
        if (memo[r][c] != 0) return memo[r][c];

        int max = 1;
        for (int[] d : DIRS) {
            int nr = r + d[0];
            int nc = c + d[1];
            if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length && matrix[nr][nc] > matrix[r][c]) {
                max = Math.max(max, 1 + dfs(matrix, nr, nc, memo));
            }
        }

        memo[r][c] = max;
        return max;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] matrix = {
            {9, 9, 4},
            {6, 6, 8},
            {2, 1, 1}
        };
        System.out.println("Longest Increasing Path: " + sol.longestIncreasingPath(matrix)); // 4 ([1, 2, 6, 9])
    }
}
