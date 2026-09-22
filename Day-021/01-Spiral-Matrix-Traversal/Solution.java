/**
 * Problem: Spiral Matrix
 * Topic: 2D Grid / Boundary Traversal
 * Language: Java
 *
 * Approach:
 * Maintain 4 boundary pointers (top, bottom, left, right).
 * Traverse top row, right column, bottom row (if top <= bottom), and left column (if left <= right),
 * contracting boundaries inward after each direction.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(1) auxiliary (excluding output list)
 */

import java.util.*;

public class Solution {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return result;

        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) result.add(matrix[top][j]);
            top++;

            for (int i = top; i <= bottom; i++) result.add(matrix[i][right]);
            right--;

            if (top <= bottom) {
                for (int j = right; j >= left; j--) result.add(matrix[bottom][j]);
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--) result.add(matrix[i][left]);
                left++;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("Spiral Order -> " + spiralOrder(matrix)); // [1, 2, 3, 6, 9, 8, 7, 4, 5]
    }
}
