/**
 * Problem: Word Break
 * Topic: Dynamic Programming / HashSet
 * Language: Java
 *
 * Approach:
 * dp[i] is true if substring s[0...i-1] can be segmented into dictionary words.
 * For each i, check all j < i if dp[j] is true AND wordDict contains s[j...i-1].
 *
 * Time Complexity: O(N^2 * L) where L is max word length
 * Space Complexity: O(N)
 */

import java.util.*;

public class Solution {
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;

        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }

    public static void main(String[] args) {
        String s = "leetcode";
        List<String> dict = Arrays.asList("leet", "code");
        System.out.println("leetcode -> " + wordBreak(s, dict)); // true
    }
}
