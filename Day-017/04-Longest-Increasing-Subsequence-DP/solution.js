/**
 * Problem: Longest Increasing Subsequence
 * Topic: Dynamic Programming
 * Language: JavaScript
 *
 * Approach:
 * Define dp[i] as length of LIS ending at index i. Initialize dp array with 1.
 * For each i, check all j < i. If nums[i] > nums[j], update dp[i] = max(dp[i], dp[j] + 1).
 * Return max value in dp.
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */

function lengthOfLIS(nums) {
    if (!nums || nums.length === 0) return 0;
    const dp = new Array(nums.length).fill(1);
    let maxLIS = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        if (dp[i] > maxLIS) maxLIS = dp[i];
    }
    return maxLIS;
}

// Test cases
console.log("[10,9,2,5,3,7,101,18] ->", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4 ([2,3,7,101])
console.log("[0,1,0,3,2,3] ->", lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4
