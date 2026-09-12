/*
 * Problem Name: Length of Last Word
 * Problem Statement: Given a string s consisting of words and spaces, return the length of the last word in the string.
 * A word is a maximal substring consisting of non-space characters only.
 * 
 * Approach: Iterate string backwards, skip trailing spaces, then count characters of last word.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static int lengthOfLastWord(String s) {
        int length = 0;
        int i = s.length() - 1;

        // Skip trailing spaces
        while (i >= 0 && s.charAt(i) == ' ') {
            i--;
        }

        // Count last word characters
        while (i >= 0 && s.charAt(i) != ' ') {
            length++;
            i--;
        }

        return length;
    }

    public static void main(String[] args) {
        System.out.println("Length of last word in 'Hello World': " + lengthOfLastWord("Hello World")); // Expected: 5
        System.out.println("Length of last word in '   fly me   to   the moon  ': " + lengthOfLastWord("   fly me   to   the moon  ")); // Expected: 4
    }
}
