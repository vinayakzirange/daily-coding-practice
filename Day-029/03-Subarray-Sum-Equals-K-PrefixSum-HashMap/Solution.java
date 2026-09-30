// Problem: Subarray Sum Equals K (LeetCode 560)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(N)

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        int prefixSum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        for (int num : nums) {
            prefixSum += num;
            if (map.containsKey(prefixSum - k)) {
                count += map.get(prefixSum - k);
            }
            map.put(prefixSum, map.getOrDefault(prefixSum, 0) + 1);
        }

        return count;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums1 = {1, 1, 1};
        System.out.println("Subarray Sum Count (k=2): " + sol.subarraySum(nums1, 2)); // 2

        int[] nums2 = {1, 2, 3};
        System.out.println("Subarray Sum Count (k=3): " + sol.subarraySum(nums2, 3)); // 2 ([1,2], [3])
    }
}
