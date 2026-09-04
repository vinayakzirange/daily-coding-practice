/*
 * Problem Name: Merge Sorted Array
 * Problem Statement: You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 * Merge nums2 into nums1 as one sorted array in-place.
 * 
 * Approach: Three pointers starting from the back (m - 1, n - 1, and m + n - 1) to avoid overwriting elements in nums1.
 * 
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class Solution {
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n - 1;

        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }

        while (p2 >= 0) {
            nums1[p] = nums2[p2];
            p2--;
            p--;
        }
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 3, 0, 0, 0};
        int[] nums2 = {2, 5, 6};
        merge(nums1, 3, nums2, 3);
        System.out.println("Merged Array: " + Arrays.toString(nums1)); // Expected: [1, 2, 2, 3, 5, 6]
    }
}
