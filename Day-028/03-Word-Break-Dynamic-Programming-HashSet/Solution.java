// Problem: Word Break (LeetCode 139)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N^2 * L) where L is max word length
// Space Complexity: O(N)

import java.util.*;

public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;

        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[s.length()];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        List<String> dict1 = Arrays.asList("leetcode", "code");
        System.out.println("Output ('leetcode'): " + sol.wordBreak("leetcode", dict1)); // true

        List<String> dict2 = Arrays.asList("apple", "pen");
        System.out.println("Output ('applepenapple'): " + sol.wordBreak("applepenapple", dict2)); // true
    }
}
