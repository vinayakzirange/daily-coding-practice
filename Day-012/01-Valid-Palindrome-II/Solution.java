/**
 * Problem: Valid Palindrome II
 * Topic: Two Pointers / String
 * Language: Java
 *
 * Approach:
 * Use two pointers (left and right). When characters mismatch, check if skipping either
 * the left character or the right character yields a valid palindrome.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static boolean validPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
            }
            left++;
            right--;
        }
        return true;
    }

    private static boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("aba -> " + validPalindrome("aba")); // true
        System.out.println("abca -> " + validPalindrome("abca")); // true
        System.out.println("abc -> " + validPalindrome("abc")); // false
    }
}
