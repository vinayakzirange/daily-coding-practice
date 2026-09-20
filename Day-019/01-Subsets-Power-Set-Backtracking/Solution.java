/**
 * Problem: Subsets (Power Set)
 * Topic: Backtracking / Combinatorics
 * Language: Java
 *
 * Approach:
 * Generate all possible subsets (power set) using recursive backtracking.
 * At each decision step, append a copy of current subset to result, then iterate
 * starting from current index to build further combinations.
 *
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N) recursion stack
 */

import java.util.*;

public class Solution {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(i + 1, nums, current, result);
            current.remove(current.size() - 1);
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println("Subsets of [1,2,3] -> " + subsets(nums));
    }
}
