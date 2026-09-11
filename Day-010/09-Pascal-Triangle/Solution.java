/*
 * Problem Name: Pascal's Triangle
 * Problem Statement: Given an integer numRows, return the first numRows of Pascal's triangle.
 * In Pascal's triangle, each number is the sum of the two numbers directly above it.
 * 
 * Approach: Dynamic Programming / Iterative row construction.
 * 
 * Time Complexity: O(numRows^2)
 * Space Complexity: O(1) auxiliary space (excluding result list)
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();

        if (numRows <= 0) return triangle;

        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.add(1);
                } else {
                    int val = triangle.get(i - 1).get(j - 1) + triangle.get(i - 1).get(j);
                    row.add(val);
                }
            }
            triangle.add(row);
        }

        return triangle;
    }

    public static void main(String[] args) {
        System.out.println("Pascal's Triangle for 5 rows: " + generate(5));
        // Expected: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
    }
}
