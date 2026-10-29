/**
 * ====================================================================
 * Problem: K-diff Pairs in an Array (LeetCode 532)
 * Difficulty: Medium
 * Topic: Array, Hash Table, Two Pointers, Binary Search, Sorting
 * ====================================================================
 * 
 * Given an array of integers nums and an integer k, return the number
 * of unique k-diff pairs in the array.
 * 
 * A k-diff pair is an integer pair (nums[i], nums[j]), where:
 * - 0 <= i, j < nums.length
 * - i != j
 * - |nums[i] - nums[j]| == k
 * 
 * Example 1:
 * Input: nums = [3, 1, 4, 1, 5], k = 2
 * Output: 2
 * Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
 * Although we have two 1s in the input, we should only return the number of unique pairs.
 * 
 * Example 2:
 * Input: nums = [1, 2, 3, 4, 5], k = 1
 * Output: 4
 * Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).
 * 
 * Example 3:
 * Input: nums = [1, 3, 1, 5, 4], k = 0
 * Output: 1
 * Explanation: There is one 0-diff pair in the array, (1, 1).
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^4
 * - -10^7 <= nums[i] <= 10^7
 * - 0 <= k <= 10^7
 * ====================================================================
 */

/**
 * Counts unique k-diff pairs using a frequency Hash Map.
 * 
 * - If k === 0, counts elements appearing >= 2 times.
 * - If k > 0, checks if x + k exists in the map for each unique key x.
 * 
 * Complexity:
 * - Time: O(N) single pass to build map, and pass over unique keys
 * - Space: O(N) auxiliary space for frequency map
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findPairs(nums, k) {
    if (k < 0) return 0;

    const countMap = new Map();
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }

    let pairs = 0;

    for (const [num, count] of countMap.entries()) {
        if (k === 0) {
            if (count >= 2) {
                pairs++;
            }
        } else {
            if (countMap.has(num + k)) {
                pairs++;
            }
        }
    }

    return pairs;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [3, 1, 4, 1, 5], k = 2 -> 2
    console.assert(findPairs([3, 1, 4, 1, 5], 2) === 2, "Test 1 Failed: expected 2");

    // Test 2: [1, 2, 3, 4, 5], k = 1 -> 4
    console.assert(findPairs([1, 2, 3, 4, 5], 1) === 4, "Test 2 Failed: expected 4");

    // Test 3: [1, 3, 1, 5, 4], k = 0 -> 1
    console.assert(findPairs([1, 3, 1, 5, 4], 0) === 1, "Test 3 Failed: expected 1");

    // Test 4: Single element array -> 0
    console.assert(findPairs([1], 0) === 0, "Test 4 Failed: expected 0");

    // Test 5: Negative numbers
    console.assert(findPairs([-1, -2, -3], 1) === 2, "Test 5 Failed: expected 2");

    console.log("All K-diff Pairs in an Array tests passed successfully!");
}

module.exports = { findPairs };
