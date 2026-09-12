/*
 * Problem Name: Contains Duplicate
 * Problem Statement: Given an integer array nums, return true if any value appears at least twice in the array, 
 * and return false if every element is distinct.
 * 
 * Approach: HashSet lookup. If element already exists in set, duplicate found.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (set.contains(num)) return true;
            set.add(num);
        }
        return false;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 3, 1};
        System.out.println("Contains duplicate in [1, 2, 3, 1]: " + containsDuplicate(nums1)); // Expected: true

        int[] nums2 = {1, 2, 3, 4};
        System.out.println("Contains duplicate in [1, 2, 3, 4]: " + containsDuplicate(nums2)); // Expected: false
    }
}
