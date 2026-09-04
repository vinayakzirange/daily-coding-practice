/*
 * Problem Name: Sort Colors (Dutch National Flag Problem)
 * Problem Statement: Given an array nums with n objects colored red, white, or blue (represented as 0, 1, and 2),
 * sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
 * 
 * Approach: Dutch National Flag algorithm using three pointers (low, mid, high).
 * - Swap 0s to low pointer and increment low and mid.
 * - If element is 1, just increment mid.
 * - Swap 2s to high pointer and decrement high.
 * 
 * Time Complexity: O(N) - Single pass
 * Space Complexity: O(1) - In-place
 */

import java.util.Arrays;

public class Solution {
    public static void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }

    public static void main(String[] args) {
        int[] nums = {2, 0, 2, 1, 1, 0};
        sortColors(nums);
        System.out.println("Sorted colors: " + Arrays.toString(nums)); // Expected: [0, 0, 1, 1, 2, 2]
    }
}
