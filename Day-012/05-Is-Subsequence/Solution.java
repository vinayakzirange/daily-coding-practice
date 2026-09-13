/**
 * Problem: Is Subsequence
 * Topic: Two Pointers
 * Language: Java
 *
 * Approach:
 * Use two pointers: i for string s, j for string t. Advance j on every step,
 * advance i when s.charAt(i) == t.charAt(j). Return true if i == s.length().
 *
 * Time Complexity: O(N) where N is length of t
 * Space Complexity: O(1)
 */

public class Solution {
    public static boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == s.length();
    }

    public static void main(String[] args) {
        System.out.println("abc, ahbgdc -> " + isSubsequence("abc", "ahbgdc")); // true
        System.out.println("axc, ahbgdc -> " + isSubsequence("axc", "ahbgdc")); // false
    }
}
