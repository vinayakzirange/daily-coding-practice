// Problem: Pacific Atlantic Water Flow (LeetCode 417)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(M * N)
// Space Complexity: O(M * N)

import java.util.*;

public class Solution {
    private int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> res = new ArrayList<>();
        if (heights == null || heights.length == 0) return res;

        int m = heights.length;
        int n = heights[0].length;

        boolean[][] pacific = new boolean[m][n];
        boolean[][] atlantic = new boolean[m][n];

        // DFS from borders
        for (int i = 0; i < m; i++) {
            dfs(heights, pacific, i, 0);
            dfs(heights, atlantic, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, pacific, 0, j);
            dfs(heights, atlantic, m - 1, j);
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pacific[i][j] && atlantic[i][j]) {
                    res.add(Arrays.asList(i, j));
                }
            }
        }

        return res;
    }

    private void dfs(int[][] heights, boolean[][] ocean, int r, int c) {
        ocean[r][c] = true;
        for (int[] d : dirs) {
            int nr = r + d[0];
            int nc = c + d[1];
            if (nr >= 0 && nr < heights.length && nc >= 0 && nc < heights[0].length 
                && !ocean[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                dfs(heights, ocean, nr, nc);
            }
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] heights = {
            {1,2,2,3,5},
            {3,2,3,4,4},
            {2,4,5,3,1},
            {6,7,1,4,5},
            {5,1,1,2,4}
        };
        System.out.println("Output: " + sol.pacificAtlantic(heights));
    }
}
