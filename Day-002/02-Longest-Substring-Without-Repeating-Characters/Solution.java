/*
 * Problem Name: Longest Substring Without Repeating Characters
 * Problem Statement: Given a string s, find the length of the longest substring without repeating characters.
 * 
 * Approach: Sliding Window technique using a HashMap/Array to store the last seen index of each character.
 * 
 * Time Complexity: O(N) - Linear pass through string
 * Space Complexity: O(min(N, M)) where M is alphabet size (O(1) for fixed character set)
 */

import java.util.HashMap;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        int maxLength = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (map.containsKey(ch)) {
                left = Math.max(left, map.get(ch) + 1);
            }
            map.put(ch, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }

    public static void main(String[] args) {
        String s = "abcabcbb";
        System.out.println("Longest Substring Length: " + lengthOfLongestSubstring(s)); // Expected: 3 ("abc")
    }
}
