/**
 * Problem: Longest Substring Without Repeating Characters
 * Topic: Sliding Window / HashMap
 * Language: Java
 *
 * Approach:
 * Use sliding window [left, right] and a Map storing character index.
 * When encountering a duplicate character inside window bounds, shift 'left' to map.get(char) + 1.
 * Track max window length.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(min(N, M))
 */

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        System.out.println("abcabcbb -> " + lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
        System.out.println("bbbbb -> " + lengthOfLongestSubstring("bbbbb")); // 1 ("b")
        System.out.println("pwwkew -> " + lengthOfLongestSubstring("pwwkew")); // 3 ("wke")
    }
}
