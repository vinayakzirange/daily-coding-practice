/**
 * Problem: Rotate Image (2D Matrix Rotation 90 degrees clockwise)
 * Topic: 2D Grid / Matrix Transpose & Reverse
 * Language: Java
 *
 * Approach:
 * Rotate an N x N 2D matrix 90 degrees clockwise in-place:
 * 1. Transpose the matrix (swap matrix[i][j] with matrix[j][i]).
 * 2. Reverse each row.
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(1) in-place
 */

import java.util.Arrays;

public class Solution {
    public static void rotate(int[][] matrix) {
        int n = matrix.length;

        // Step 1: Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // Step 2: Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        rotate(matrix);
        System.out.println("Rotated Matrix -> " + Arrays.deepToString(matrix));
        // Output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
    }
}
