/*
 * Problem Name: Search in Rotated Sorted Array
 * Problem Statement: Given a rotated sorted array nums and a target value, return the index of target if it is in nums, or -1.
 * Must run in O(log n) time.
 * 
 * Approach: Modified Binary Search. Identify which half (left or right) is sorted at mid, then check if target lies within bounds.
 * 
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;

            // Left half is sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } 
            // Right half is sorted
            else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        System.out.println("Index of 0: " + search(nums, 0)); // Expected: 4
        System.out.println("Index of 3: " + search(nums, 3)); // Expected: -1
    }
}
