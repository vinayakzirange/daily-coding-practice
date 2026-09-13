/**
 * Problem: Intersection of Two Arrays II
 * Topic: HashMap / Frequency Array
 * Language: Java
 *
 * Approach:
 * Use a Map to count frequencies of elements in nums1. Iterate through nums2,
 * adding matching elements to result and decrementing their counts in the map.
 *
 * Time Complexity: O(N + M)
 * Space Complexity: O(min(N, M))
 */

import java.util.*;

public class Solution {
    public static int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int num : nums1) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        
        List<Integer> resultList = new ArrayList<>();
        for (int num : nums2) {
            if (map.getOrDefault(num, 0) > 0) {
                resultList.add(num);
                map.put(num, map.get(num) - 1);
            }
        }
        
        int[] result = new int[resultList.size()];
        for (int i = 0; i < resultList.size(); i++) {
            result[i] = resultList.get(i);
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 2, 1}, nums2 = {2, 2};
        System.out.println("Intersection: " + Arrays.toString(intersect(nums1, nums2))); // [2, 2]
    }
}
