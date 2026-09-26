// Problem: Coin Change (LeetCode 322)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(amount * coins.length)
// Space Complexity: O(amount)

import java.util.Arrays;

public class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] coins = {1, 2, 5};
        System.out.println("Output (amount=11): " + sol.coinChange(coins, 11)); // 3 (5+5+1)
        System.out.println("Output (amount=3, coins=[2]): " + sol.coinChange(new int[]{2}, 3)); // -1
    }
}
