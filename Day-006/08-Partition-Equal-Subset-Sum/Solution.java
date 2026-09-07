/*
 * Problem Name: Partition Equal Subset Sum
 * Problem Statement: Given an integer array nums, return true if you can partition the array into two subsets 
 * such that the sum of the elements in both subsets is equal.
 * 
 * Approach: 0-1 Knapsack Dynamic Programming. Check if a subset with sum = totalSum / 2 exists.
 * 
 * Time Complexity: O(N * Target) where Target = totalSum / 2
 * Space Complexity: O(Target) 1D DP Array
 */

public class Solution {
    public static boolean canPartition(int[] nums) {
        int sum = 0;
        for (int num : nums) sum += num;

        if (sum % 2 != 0) return false;
        int target = sum / 2;

        boolean[] dp = new boolean[target + 1];
        dp[0] = true;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }

        return dp[target];
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 5, 11, 5};
        System.out.println("Can partition [1, 5, 11, 5]: " + canPartition(nums1)); // Expected: true ([1, 5, 5] and [11])

        int[] nums2 = {1, 2, 3, 5};
        System.out.println("Can partition [1, 2, 3, 5]: " + canPartition(nums2)); // Expected: false
    }
}
