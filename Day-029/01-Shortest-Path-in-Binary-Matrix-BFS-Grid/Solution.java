// Problem: Shortest Path in Binary Matrix (LeetCode 1091)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N^2)
// Space Complexity: O(N^2)

import java.util.*;

public class Solution {
    private static final int[][] DIRS = {
        {-1,-1}, {-1,0}, {-1,1},
        {0,-1},          {0,1},
        {1,-1},  {1,0},  {1,1}
    };

    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) return -1;
        if (n == 1) return 1;

        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{0, 0, 1}); // {r, c, dist}
        grid[0][0] = 1; // Mark visited

        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int r = curr[0], c = curr[1], dist = curr[2];

            if (r == n - 1 && c == n - 1) return dist;

            for (int[] d : DIRS) {
                int nr = r + d[0];
                int nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    queue.add(new int[]{nr, nc, dist + 1});
                }
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] grid1 = {{0,1},{1,0}};
        System.out.println("Output: " + sol.shortestPathBinaryMatrix(grid1)); // 2

        int[][] grid2 = {{0,0,0},{1,1,0},{1,1,0}};
        System.out.println("Output: " + sol.shortestPathBinaryMatrix(grid2)); // 4
    }
}
