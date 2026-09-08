/*
 * Problem Name: Number of Islands
 * Problem Statement: Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), 
 * return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * 
 * Approach: Depth-First Search (DFS). Traverse every cell. When a '1' is found, increment island count and 
 * run DFS to sink all connected '1's to '0'.
 * 
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N) worst case recursion stack
 */

public class Solution {
    public static int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int numIslands = 0;
        int rows = grid.length;
        int cols = grid[0].length;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    numIslands++;
                    dfs(grid, r, c);
                }
            }
        }

        return numIslands;
    }

    private static void dfs(char[][] grid, int r, int c) {
        int rows = grid.length;
        int cols = grid[0].length;

        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '0') {
            return;
        }

        grid[r][c] = '0'; // Sink the island land

        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

    public static void main(String[] args) {
        char[][] grid = {
            {'1', '1', '1', '1', '0'},
            {'1', '1', '0', '1', '0'},
            {'1', '1', '0', '0', '0'},
            {'0', '0', '0', '0', '0'}
        };
        System.out.println("Number of Islands: " + numIslands(grid)); // Expected: 1
    }
}
