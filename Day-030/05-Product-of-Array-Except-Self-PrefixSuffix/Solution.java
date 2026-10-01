// Problem: Product of Array Except Self (LeetCode 238)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1) excluding output array

import java.util.Arrays;

public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        // Step 1: Prefix products
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        // Step 2: Multiply with suffix products
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] = res[i] * suffix;
            suffix *= nums[i];
        }

        return res;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {1, 2, 3, 4};
        System.out.println("Output: " + Arrays.toString(sol.productExceptSelf(nums))); // [24, 12, 8, 6]
    }
}
