/**
 * Problem: Sort Colors (Dutch National Flag Algorithm)
 * Topic: Three Pointers / In-Place Sorting
 * Language: Java
 *
 * Approach:
 * Maintain 3 pointers: low (0s end boundary), mid (current element), high (2s start boundary).
 * Swapping 0s to low++ and 2s to high-- sorts the array in a single pass.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class Solution {
    public static void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low++, mid++);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high--);
            }
        }
    }

    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) {
        int[] nums = {2, 0, 2, 1, 1, 0};
        sortColors(nums);
        System.out.println("Sorted -> " + Arrays.toString(nums)); // [0, 0, 1, 1, 2, 2]
    }
}
