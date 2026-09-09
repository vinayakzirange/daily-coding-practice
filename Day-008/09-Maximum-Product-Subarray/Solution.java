/*
 * Problem Name: Maximum Product Subarray
 * Problem Statement: Given an integer array nums, find a contiguous non-empty subarray that has the largest product, and return the product.
 * 
 * Approach: Dynamic Programming keeping track of both maxProduct and minProduct (since negative * negative = positive).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static int maxProduct(int[] nums) {
        if (nums == null || nums.length == 0) return 0;

        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];

        for (int i = 1; i < nums.length; i++) {
            int curr = nums[i];

            if (curr < 0) {
                int temp = maxProd;
                maxProd = minProd;
                minProd = temp;
            }

            maxProd = Math.max(curr, maxProd * curr);
            minProd = Math.min(curr, minProd * curr);

            result = Math.max(result, maxProd);
        }

        return result;
    }

    public static void main(String[] args) {
        int[] nums1 = {2, 3, -2, 4};
        System.out.println("Max Product of [2,3,-2,4]: " + maxProduct(nums1)); // Expected: 6

        int[] nums2 = {-2, 0, -1};
        System.out.println("Max Product of [-2,0,-1]: " + maxProduct(nums2)); // Expected: 0
    }
}
