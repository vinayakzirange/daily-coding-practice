/*
 * Problem Name: 3Sum
 * Problem Statement: Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * 
 * Approach: Sort array, iterate i, and use Two Pointers (left, right) to find pairs summing to -nums[i].
 * Skip duplicates for all three pointers to ensure unique triplets.
 * 
 * Time Complexity: O(N^2)
 * Space Complexity: O(1) (excluding space for result list)
 */

import java.util.*;

public class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates for i

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++; // Skip left duplicates
                    while (left < right && nums[right] == nums[right - 1]) right--; // Skip right duplicates
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {-1, 0, 1, 2, -1, -4};
        System.out.println("3Sum Triplets: " + threeSum(nums)); // Expected: [[-1, -1, 2], [-1, 0, 1]]
    }
}
