/*
 * Problem Name: Kth Smallest Element in a Sorted Matrix
 * Problem Statement: Given an n x n matrix where each of the rows and columns is sorted in ascending order, 
 * find the kth smallest element in the matrix.
 * 
 * Approach: Binary Search on Value Range [matrix[0][0], matrix[n-1][n-1]].
 * Count elements <= mid in O(N) per step using step search from top-right.
 * 
 * Time Complexity: O(N log(Max - Min))
 * Space Complexity: O(1)
 */

public class Solution {
    public static int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        int low = matrix[0][0];
        int high = matrix[n - 1][n - 1];

        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = countLessEqual(matrix, mid);

            if (count < k) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }

    private static int countLessEqual(int[][] matrix, int mid) {
        int n = matrix.length;
        int count = 0;
        int row = n - 1;
        int col = 0;

        while (row >= 0 && col < n) {
            if (matrix[row][col] <= mid) {
                count += (row + 1);
                col++;
            } else {
                row--;
            }
        }

        return count;
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1,  5,  9},
            {10, 11, 13},
            {12, 13, 15}
        };
        int k = 8;
        System.out.println("8th Smallest Element: " + kthSmallest(matrix, k)); // Expected: 13
    }
}
