/*
 * Problem Name: Product of Array Except Self
 * Problem Statement: Given an integer array nums, return an array answer such that answer[i] is equal 
 * to the product of all the elements of nums except nums[i], without using division.
 * 
 * Approach: Compute prefix products into output array, then multiply by suffix products from right to left.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) auxiliary space (excluding result array)
 */

import java.util.Arrays;

public class Solution {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        // Prefix products
        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        // Suffix products
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= nums[i];
        }

        return result;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4};
        System.out.println("Product Except Self: " + Arrays.toString(productExceptSelf(nums))); // Expected: [24, 12, 8, 6]
    }
}
