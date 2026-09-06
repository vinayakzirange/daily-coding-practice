/*
 * Problem Name: Subarray Sum Equals K
 * Problem Statement: Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
 * 
 * Approach: Prefix Sum + HashMap. Store frequency of prefix sums encountered so far.
 * If (currentPrefixSum - k) exists in map, add its frequency to result.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

import java.util.HashMap;

public class Solution {
    public static int subarraySum(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        int count = 0;
        int sum = 0;

        for (int num : nums) {
            sum += num;
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }

        return count;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1};
        int k = 2;
        System.out.println("Total Subarrays with sum 2: " + subarraySum(nums, k)); // Expected: 2
    }
}
