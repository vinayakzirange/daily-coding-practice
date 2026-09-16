/**
 * Problem: Flood Fill Algorithm
 * Topic: 2D Grid / DFS / Graph Traversal
 * Language: Java
 *
 * Approach:
 * Check starting pixel color. If it differs from newColor, recursively DFS fill top, bottom,
 * left, and right adjacent pixels with matching original color.
 *
 * Time Complexity: O(N * M) grid size
 * Space Complexity: O(N * M) recursion stack
 */

import java.util.Arrays;

public class Solution {
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int originalColor = image[sr][sc];
        if (originalColor != color) {
            dfs(image, sr, sc, originalColor, color);
        }
        return image;
    }

    private static void dfs(int[][] image, int r, int c, int original, int color) {
        if (r < 0 || r >= image.length || c < 0 || c >= image[0].length) return;
        if (image[r][c] != original) return;

        image[r][c] = color;
        dfs(image, r + 1, c, original, color);
        dfs(image, r - 1, c, original, color);
        dfs(image, r, c + 1, original, color);
        dfs(image, r, c - 1, original, color);
    }

    public static void main(String[] args) {
        int[][] image = {
            {1, 1, 1},
            {1, 1, 0},
            {1, 0, 1}
        };
        int[][] result = floodFill(image, 1, 1, 2);
        System.out.println("Flood Fill Result: " + Arrays.deepToString(result));
    }
}
