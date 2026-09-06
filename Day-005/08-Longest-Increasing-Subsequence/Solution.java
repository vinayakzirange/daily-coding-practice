/*
 * Problem Name: Longest Increasing Subsequence (LIS)
 * Problem Statement: Given an integer array nums, return the length of the longest strictly increasing subsequence.
 * 
 * Approach: Dynamic Programming. dp[i] represents length of LIS ending at index i.
 * 
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */

import java.util.Arrays;

public class Solution {
    public static int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);

        int maxLIS = 1;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLIS = Math.max(maxLIS, dp[i]);
        }

        return maxLIS;
    }

    public static void main(String[] args) {
        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS Length: " + lengthOfLIS(nums)); // Expected: 4 ([2,3,7,101] or [2,5,7,101])
    }
}
