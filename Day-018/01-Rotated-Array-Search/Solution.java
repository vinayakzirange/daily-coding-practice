/**
 * Problem: Search in Rotated Sorted Array
 * Topic: Binary Search / Array Rotation
 * Language: Java
 *
 * Approach:
 * Modified Binary Search. At least one half (left or right) must be sorted.
 * Determine which half is sorted and check if target lies within that half's range.
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

            // Check if left half is sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else { // Right half is sorted
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
        System.out.println("Search 0 in [4,5,6,7,0,1,2] -> " + search(nums, 0)); // 4
        System.out.println("Search 3 in [4,5,6,7,0,1,2] -> " + search(nums, 3)); // -1
    }
}
