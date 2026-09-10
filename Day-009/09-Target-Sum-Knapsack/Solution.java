/*
 * Problem Name: Target Sum
 * Problem Statement: You are given an integer array nums and an integer target. 
 * You want to build an expression by adding '+' or '-' before each integer. Return the number of ways to assign symbols to make the sum equal to target.
 * 
 * Approach: Reduce to Subset Sum problem. Let P be positive subset and N be negative subset.
 * P - N = target and P + N = totalSum => 2 * P = target + totalSum => P = (target + totalSum) / 2.
 * 
 * Time Complexity: O(N * SubsetSum)
 * Space Complexity: O(SubsetSum)
 */

public class Solution {
    public static int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int num : nums) sum += num;

        if (Math.abs(target) > sum || (target + sum) % 2 != 0) return 0;
        int subsetSum = (target + sum) / 2;
        if (subsetSum < 0) return 0;

        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;

        for (int num : nums) {
            for (int j = subsetSum; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }

        return dp[subsetSum];
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1, 1, 1};
        int target = 3;
        System.out.println("Ways to target 3: " + findTargetSumWays(nums, target)); // Expected: 5
    }
}
