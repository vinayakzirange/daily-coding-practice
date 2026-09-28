// Problem: Target Sum (LeetCode 494)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N * Target)
// Space Complexity: O(Target)

public class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int n : nums) sum += n;

        if (sum < Math.abs(target) || (sum + target) % 2 != 0) {
            return 0;
        }

        int s1 = (sum + target) / 2;
        int[] dp = new int[s1 + 1];
        dp[0] = 1;

        for (int num : nums) {
            for (int j = s1; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }

        return dp[s1];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {1, 1, 1, 1, 1};
        System.out.println("Output (target=3): " + sol.findTargetSumWays(nums, 3)); // 5
    }
}
