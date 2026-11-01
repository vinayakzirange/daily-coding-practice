/**
 * ====================================================================
 * Problem: Number of Longest Increasing Subsequence (LeetCode 673)
 * Difficulty: Medium
 * Topic: Array, Dynamic Programming, Binary Indexed Tree, Segment Tree
 * ====================================================================
 * 
 * Given an integer array nums, return the number of longest increasing
 * subsequences.
 * 
 * Notice that the sequence has to be strictly increasing.
 * 
 * Example 1:
 * Input: nums = [1,3,5,4,7]
 * Output: 2
 * Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].
 * 
 * Example 2:
 * Input: nums = [2,2,2,2,2]
 * Output: 5
 * Explanation: The length of the longest increasing subsequence is 1,
 * and there are 5 subsequences of length 1, so output 5.
 * 
 * Constraints:
 * - 1 <= nums.length <= 2000
 * - -10^6 <= nums[i] <= 10^6
 * ====================================================================
 */

/**
 * Computes the count of longest increasing subsequences using dual DP arrays.
 * 
 * Complexity:
 * - Time: O(N^2) where N is the length of nums
 * - Space: O(N) for lengths and counts arrays
 * 
 * @param {number[]} nums
 * @return {number}
 */
function findNumberOfLIS(nums) {
    const n = nums.length;
    if (n <= 1) return n;

    // lengths[i] = length of LIS ending at nums[i]
    const lengths = new Array(n).fill(1);
    // counts[i] = number of LIS ending at nums[i]
    const counts = new Array(n).fill(1);

    let maxLength = 1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (lengths[j] + 1 > lengths[i]) {
                    lengths[i] = lengths[j] + 1;
                    counts[i] = counts[j];
                } else if (lengths[j] + 1 === lengths[i]) {
                    counts[i] += counts[j];
                }
            }
        }
        if (lengths[i] > maxLength) {
            maxLength = lengths[i];
        }
    }

    let totalNumberOfLIS = 0;
    for (let i = 0; i < n; i++) {
        if (lengths[i] === maxLength) {
            totalNumberOfLIS += counts[i];
        }
    }

    return totalNumberOfLIS;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [1,3,5,4,7] -> 2 ([1,3,4,7] and [1,3,5,7])
    console.assert(
        findNumberOfLIS([1, 3, 5, 4, 7]) === 2,
        "Test 1 Failed: expected 2"
    );

    // Test 2: [2,2,2,2,2] -> 5 (all length 1)
    console.assert(
        findNumberOfLIS([2, 2, 2, 2, 2]) === 5,
        "Test 2 Failed: expected 5"
    );

    // Test 3: Strictly decreasing [5,4,3,2,1] -> 5
    console.assert(
        findNumberOfLIS([5, 4, 3, 2, 1]) === 5,
        "Test 3 Failed: expected 5"
    );

    // Test 4: Single element [100] -> 1
    console.assert(
        findNumberOfLIS([100]) === 1,
        "Test 4 Failed: expected 1"
    );

    // Test 5: Strictly increasing [1,2,3,4,5] -> 1
    console.assert(
        findNumberOfLIS([1, 2, 3, 4, 5]) === 1,
        "Test 5 Failed: expected 1"
    );

    console.log("All Number of Longest Increasing Subsequence tests passed successfully!");
}

module.exports = { findNumberOfLIS };
