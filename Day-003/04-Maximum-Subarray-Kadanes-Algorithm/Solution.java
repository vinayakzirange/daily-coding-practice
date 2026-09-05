/*
 * Problem Name: Maximum Subarray (Kadane's Algorithm)
 * Problem Statement: Given an integer array nums, find the contiguous subarray (containing at least one number) 
 * which has the largest sum and return its sum.
 * 
 * Approach: Dynamic Programming / Kadane's Algorithm.
 * At each index, decide whether to extend the current subarray sum or start fresh from current element.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }

        return maxSoFar;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Maximum Subarray Sum: " + maxSubArray(nums)); // Expected: 6 (Subarray: [4,-1,2,1])
    }
}
