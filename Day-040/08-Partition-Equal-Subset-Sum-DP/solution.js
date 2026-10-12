/**
 * Problem: Partition Equal Subset Sum (LeetCode 416)
 * Difficulty: Medium
 * Topic: Dynamic Programming / Array / 0-1 Knapsack
 *
 * Description:
 * Given an integer array nums, return true if you can partition the array into
 * two subsets such that the sum of the elements in both subsets is equal or
 * false otherwise.
 *
 * Example 1:
 * Input: nums = [1,5,11,5]
 * Output: true
 * Explanation: The array can be partitioned as [1, 5, 5] and [11].
 *
 * Example 2:
 * Input: nums = [1,2,3,5]
 * Output: false
 * Explanation: The array cannot be partitioned into equal sum subsets.
 *
 * Constraints:
 * - 1 <= nums.length <= 200
 * - 1 <= nums[i] <= 100
 *
 * Complexity Analysis:
 * - Time Complexity: O(n * target) where target = sum(nums) / 2.
 * - Space Complexity: O(target) auxiliary space using a 1D DP boolean array.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
    const totalSum = nums.reduce((acc, val) => acc + val, 0);

    // If total sum is odd, it cannot be partitioned into two equal integer subsets
    if (totalSum % 2 !== 0) {
        return false;
    }

    const target = totalSum / 2;

    // dp[j] indicates whether a subset with sum j can be formed
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // Base case: zero sum is always possible with empty subset

    for (const num of nums) {
        if (num > target) return false;

        // Traverse backwards to prevent using the same element multiple times
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }

        if (dp[target]) return true;
    }

    return dp[target];
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { nums: [1, 5, 11, 5], expected: true },
    { nums: [1, 2, 3, 5], expected: false },
    { nums: [1, 2, 5], expected: false },
    { nums: [2, 2, 2, 2], expected: true },
    { nums: [1, 1], expected: true },
    { nums: [100], expected: false },
    { nums: [1, 2, 3, 4, 5, 6, 7], expected: true }, // Sum=28, target=14
];

testCases.forEach((tc, idx) => {
    const result = canPartition(tc.nums);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: nums=[${tc.nums}], got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: nums=[${tc.nums}] -> canPartition = ${result}`);
});

console.log("\nAll Partition Equal Subset Sum tests passed successfully!");
