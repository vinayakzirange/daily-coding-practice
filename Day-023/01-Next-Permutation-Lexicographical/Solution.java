/**
 * Problem: Next Permutation
 * Topic: Array / Two Pointers / Lexicographical Order
 * Language: Java
 *
 * Approach:
 * 1. Find the first decreasing element from right (pivot i where nums[i] < nums[i+1]).
 * 2. Find the smallest element greater than nums[i] to its right and swap them.
 * 3. Reverse the subarray to the right of pivot i to get the next lexicographical permutation.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1) in-place
 */

import java.util.Arrays;

public class Solution {
    public static void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;

        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        if (i >= 0) {
            int j = n - 1;
            while (j >= 0 && nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }

        reverse(nums, i + 1, n - 1);
    }

    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start++, end--);
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        nextPermutation(nums);
        System.out.println("Next Permutation [1,2,3] -> " + Arrays.toString(nums)); // [1, 3, 2]
    }
}
