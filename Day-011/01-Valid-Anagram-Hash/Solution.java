/*
 * Problem Name: Valid Anagram
 * Problem Statement: Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, 
 * typically using all the original letters exactly once.
 * 
 * Approach: Frequency count array of size 26 for lower-case English letters.
 * Increment for string s and decrement for string t.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int c : count) {
            if (c != 0) return false;
        }

        return true;
    }

    public static void main(String[] args) {
        System.out.println("Is 'anagram' & 'nagaram' valid anagram: " + isAnagram("anagram", "nagaram")); // Expected: true
        System.out.println("Is 'rat' & 'car' valid anagram: " + isAnagram("rat", "car")); // Expected: false
    }
}
