/**
 * Problem: Longest Harmonious Subsequence
 * Topic: HashMap / Counting
 * Language: Java
 *
 * Approach:
 * Count occurrences of each number in a HashMap. Iterate through keySet, and if
 * map contains (key + 1), update maxLen = max(maxLen, map.get(key) + map.get(key + 1)).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int findLHS(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        
        int maxLen = 0;
        for (int key : map.keySet()) {
            if (map.containsKey(key + 1)) {
                maxLen = Math.max(maxLen, map.get(key) + map.get(key + 1));
            }
        }
        return maxLen;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 3, 2, 2, 5, 2, 3, 7};
        System.out.println("LHS [1, 3, 2, 2, 5, 2, 3, 7] -> " + findLHS(nums1)); // 5 (2,2,2,3,3)
        
        int[] nums2 = {1, 2, 3, 4};
        System.out.println("LHS [1, 2, 3, 4] -> " + findLHS(nums2)); // 2
    }
}
