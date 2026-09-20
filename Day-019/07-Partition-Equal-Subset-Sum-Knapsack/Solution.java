/**
 * Problem: Partition Equal Subset Sum
 * Topic: Dynamic Programming / 0-1 Knapsack Subsets
 * Language: Java
 *
 * Approach:
 * Calculate total array sum. If sum is odd, return false. Target sum = sum / 2.
 * Reduce to 0-1 Knapsack: dp[i] is true if subset sum i can be formed.
 * Update 1D DP array backwards for each number in nums.
 *
 * Time Complexity: O(N * Target)
 * Space Complexity: O(Target)
 */

public class Solution {
    public static boolean canPartition(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;

        if (totalSum % 2 != 0) return false;
        int target = totalSum / 2;

        boolean[] dp = new boolean[target + 1];
        dp[0] = true;

        for (int num : nums) {
            for (int i = target; i >= num; i--) {
                dp[i] = dp[i] || dp[i - num];
            }
        }
        return dp[target];
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 5, 11, 5};
        System.out.println("[1, 5, 11, 5] -> " + canPartition(nums1)); // true (subset [1,5,5] and [11])

        int[] nums2 = {1, 2, 3, 5};
        System.out.println("[1, 2, 3, 5] -> " + canPartition(nums2)); // false
    }
}
