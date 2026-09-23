/**
 * Problem: Longest Common Prefix
 * Topic: String / Vertical Scanning / Trie
 * Language: Java
 *
 * Approach:
 * Compare character by character at column index i across all strings.
 * Stop and return substring s[0...i-1] as soon as mismatch or string end is reached.
 *
 * Time Complexity: O(S) where S is total sum of characters
 * Space Complexity: O(1)
 */

public class Solution {
    public static String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        for (int i = 0; i < strs[0].length(); i++) {
            char c = strs[0].charAt(i);
            for (int j = 1; j < strs.length; j++) {
                if (i == strs[j].length() || strs[j].charAt(i) != c) {
                    return strs[0].substring(0, i);
                }
            }
        }
        return strs[0];
    }

    public static void main(String[] args) {
        String[] strs1 = {"flower", "flow", "flight"};
        System.out.println("Common Prefix -> " + longestCommonPrefix(strs1)); // "fl"

        String[] strs2 = {"dog", "racecar", "car"};
        System.out.println("Common Prefix -> " + longestCommonPrefix(strs2)); // ""
    }
}
