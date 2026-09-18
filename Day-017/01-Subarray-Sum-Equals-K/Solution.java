/**
 * Problem: Subarray Sum Equals K
 * Topic: Prefix Sum / HashMap
 * Language: Java
 *
 * Approach:
 * Maintain running sum (prefix sum) and store frequencies of prefix sums in a HashMap.
 * For each index, check if map contains (currentPrefixSum - k). Add its frequency to count.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int currentSum = 0;
        int count = 0;

        for (int num : nums) {
            currentSum += num;
            if (map.containsKey(currentSum - k)) {
                count += map.get(currentSum - k);
            }
            map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);
        }
        return count;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 1, 1};
        System.out.println("[1,1,1], k=2 -> " + subarraySum(nums1, 2)); // 2

        int[] nums2 = {1, 2, 3};
        System.out.println("[1,2,3], k=3 -> " + subarraySum(nums2, 3)); // 2
    }
}
