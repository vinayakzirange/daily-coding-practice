/*
 * Problem Name: Missing Number
 * Problem Statement: Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing.
 * 
 * Approach: Gauss Sum Formula n * (n + 1) / 2.
 * Expected total sum minus actual array sum equals the missing number.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;

        for (int num : nums) {
            actualSum += num;
        }

        return expectedSum - actualSum;
    }

    public static void main(String[] args) {
        int[] nums = {3, 0, 1};
        System.out.println("Missing Number in [3, 0, 1]: " + missingNumber(nums)); // Expected: 2
    }
}
