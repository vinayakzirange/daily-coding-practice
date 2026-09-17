/**
 * Problem: Product of Array Except Self
 * Topic: Array / Prefix & Suffix Products
 * Language: Java
 *
 * Approach:
 * First pass: Compute prefix products storing in result array.
 * Second pass: Iterate right to left accumulating suffix product into result array in-place.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1) auxiliary space (output array does not count)
 */

import java.util.Arrays;

public class Solution {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] = result[i] * suffix;
            suffix *= nums[i];
        }

        return result;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4};
        System.out.println("[1,2,3,4] -> " + Arrays.toString(productExceptSelf(nums))); // [24, 12, 8, 6]
    }
}
