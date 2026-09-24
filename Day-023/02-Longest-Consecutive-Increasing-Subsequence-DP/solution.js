/**
 * Problem: Longest Continuous Increasing Subsequence
 * Topic: Array / Sliding Window / Greedy
 * Language: JavaScript
 *
 * Approach:
 * Track continuous increasing streak ending at index i. If nums[i] > nums[i-1],
 * increment current streak; else reset streak to 1. Maintain max streak found.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function findLengthOfLCIS(nums) {
    if (!nums || nums.length === 0) return 0;
    let maxLen = 1;
    let currentLen = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            currentLen++;
            if (currentLen > maxLen) maxLen = currentLen;
        } else {
            currentLen = 1;
        }
    }
    return maxLen;
}

// Test cases
console.log("[1,3,5,4,7] ->", findLengthOfLCIS([1, 3, 5, 4, 7])); // 3 ([1,3,5])
console.log("[2,2,2,2,2] ->", findLengthOfLCIS([2, 2, 2, 2, 2])); // 1
