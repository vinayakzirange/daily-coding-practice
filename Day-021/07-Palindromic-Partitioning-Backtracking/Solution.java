/**
 * Problem: Palindrome Partitioning
 * Topic: Backtracking / String Partitioning
 * Language: Java
 *
 * Approach:
 * Use recursive backtracking starting from index 0. At each step, test if substring s[start...i]
 * is a valid palindrome. If true, append to path and backtrack on s[i+1...n-1].
 *
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N) recursion stack
 */

import java.util.*;

public class Solution {
    public static List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(0, s, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int start, String s, List<String> current, List<List<String>> result) {
        if (start == s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i < s.length(); i++) {
            if (isPalindrome(s, start, i)) {
                current.add(s.substring(start, i + 1));
                backtrack(i + 1, s, current, result);
                current.remove(current.size() - 1);
            }
        }
    }

    private static boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("Partition 'aab' -> " + partition("aab")); // [["a","a","b"], ["aa","b"]]
    }
}
