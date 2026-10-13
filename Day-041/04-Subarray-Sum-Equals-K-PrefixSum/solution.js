/**
 * Problem: Subarray Sum Equals K (LeetCode 560)
 * Difficulty: Medium
 * Topic: Array / Hash Table / Prefix Sum
 *
 * Description:
 * Given an array of integers nums and an integer k, return the total number
 * of subarrays whose sum equals to k.
 *
 * A subarray is a contiguous non-empty sequence of elements within an array.
 * Note: nums can contain negative numbers and zeroes.
 *
 * Example 1:
 * Input: nums = [1,1,1], k = 2
 * Output: 2
 *
 * Example 2:
 * Input: nums = [1,2,3], k = 3
 * Output: 2
 *
 * Constraints:
 * - 1 <= nums.length <= 2 * 10^4
 * - -1000 <= nums[i] <= 1000
 * - -10^7 <= k <= 10^7
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) single pass through the array.
 * - Space Complexity: O(n) auxiliary space for the prefix sums frequency map.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
    let count = 0;
    let currentSum = 0;
    // Map to store frequency of prefix sums encountered so far
    const prefixCount = new Map();
    // Base case: prefix sum of 0 has occurred once (for subarrays starting at index 0)
    prefixCount.set(0, 1);

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];

        // If (currentSum - k) exists as a prefix sum, every occurrence marks
        // a valid subarray ending at index i whose sum is k
        const targetPrefix = currentSum - k;
        if (prefixCount.has(targetPrefix)) {
            count += prefixCount.get(targetPrefix);
        }

        // Record the current prefix sum
        prefixCount.set(currentSum, (prefixCount.get(currentSum) || 0) + 1);
    }

    return count;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { nums: [1, 1, 1], k: 2, expected: 2 },
    { nums: [1, 2, 3], k: 3, expected: 2 },
    { nums: [1, -1, 0], k: 0, expected: 3 }, // [1, -1], [0], [1, -1, 0]
    { nums: [3, 4, 7, 2, -3, 1, 4, 2], k: 7, expected: 4 },
    { nums: [1], k: 0, expected: 0 },
    { nums: [1], k: 1, expected: 1 },
    { nums: [0, 0, 0, 0, 0], k: 0, expected: 15 } // 5*6/2 = 15
];

testCases.forEach((tc, idx) => {
    const result = subarraySum(tc.nums, tc.k);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: k=${tc.k}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: nums=[${tc.nums.slice(0, 5)}...], k=${tc.k} -> subarrays count = ${result}`);
});

console.log("\nAll Subarray Sum Equals K tests passed successfully!");
