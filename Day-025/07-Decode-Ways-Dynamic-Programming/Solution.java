// Problem: Decode Ways (LeetCode 91)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(N) or O(1)

public class Solution {
    public int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') {
            return 0;
        }

        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            int singleDigit = Integer.parseInt(s.substring(i - 1, i));
            int doubleDigit = Integer.parseInt(s.substring(i - 2, i));

            if (singleDigit >= 1 && singleDigit <= 9) {
                dp[i] += dp[i - 1];
            }

            if (doubleDigit >= 10 && doubleDigit <= 26) {
                dp[i] += dp[i - 2];
            }
        }

        return dp[n];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println("Output ('12'): " + sol.numDecodings("12")); // 2 ("AB", "L")
        System.out.println("Output ('226'): " + sol.numDecodings("226")); // 3 ("BZ", "VF", "BBF")
        System.out.println("Output ('06'): " + sol.numDecodings("06")); // 0
    }
}
