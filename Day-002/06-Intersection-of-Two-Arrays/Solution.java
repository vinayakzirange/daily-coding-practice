/*
 * Problem Name: Intersection of Two Arrays
 * Problem Statement: Given two integer arrays nums1 and nums2, return an array of their intersection.
 * Each element in the result must be unique.
 * 
 * Approach: Use a HashSet to store unique elements of nums1, then iterate through nums2 and add matches to a result set.
 * 
 * Time Complexity: O(N + M) where N and M are lengths of nums1 and nums2.
 * Space Complexity: O(N)
 */

import java.util.HashSet;
import java.util.Arrays;

public class Solution {
    public static int[] intersection(int[] nums1, int[] nums2) {
        HashSet<Integer> set1 = new HashSet<>();
        for (int n : nums1) set1.add(n);

        HashSet<Integer> resultSet = new HashSet<>();
        for (int n : nums2) {
            if (set1.contains(n)) {
                resultSet.add(n);
            }
        }

        int[] result = new int[resultSet.size()];
        int i = 0;
        for (int n : resultSet) {
            result[i++] = n;
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 2, 1};
        int[] nums2 = {2, 2};
        System.out.println("Intersection: " + Arrays.toString(intersection(nums1, nums2))); // Expected: [2]
    }
}
