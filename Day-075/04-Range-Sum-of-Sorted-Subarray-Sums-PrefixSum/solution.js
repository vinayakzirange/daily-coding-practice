/**
 * Problem: Range Sum of Sorted Subarray Sums (LeetCode 1508)
 * Difficulty: Medium
 * Category: Array / Two Pointers / Sorting / Prefix Sum
 *
 * Description:
 * You are given the array nums consisting of n positive integers. You computed
 * the sum of all non-empty continuous subarrays from the array and then sorted
 * them in non-decreasing order, creating a new array of n * (n + 1) / 2 numbers.
 *
 * Return the sum of the numbers from index left to index right (1-indexed) inclusive,
 * modulo 10^9 + 7.
 *
 * Example 1:
 *   Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
 *   Output: 13
 *   Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4.
 *                After sorting them in non-decreasing order we have the new array
 *                [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from
 *                index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13.
 *
 * Example 2:
 *   Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
 *   Output: 6
 *   Explanation: The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.
 *
 * Example 3:
 *   Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
 *   Output: 50
 *
 * Constraints:
 *   - n == nums.length
 *   - 1 <= nums.length <= 1000
 *   - 1 <= nums[i] <= 100
 *   - 1 <= left <= right <= n * (n + 1) / 2
 */

/**
 * Generates all subarray sums, sorts them, and computes range sum modulo 10^9 + 7.
 *
 * Simple Logic:
 * With n <= 1000, there are at most 500,500 subarray sums.
 * Generating and sorting them in memory is simple, direct, and fast.
 *
 * Time Complexity: O(n^2 log(n^2))
 * Space Complexity: O(n^2)
 *
 * @param {number[]} nums
 * @param {number} n
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function rangeSum(nums, n, left, right) {
  const subarraySums = [];

  // Compute all continuous subarray sums
  for (let i = 0; i < n; i++) {
    let currentSum = 0;
    for (let j = i; j < n; j++) {
      currentSum += nums[j];
      subarraySums.push(currentSum);
    }
  }

  // Sort sums in non-decreasing order
  subarraySums.sort((a, b) => a - b);

  const MOD = 1000000007;
  let result = 0;

  // 1-indexed range sum [left, right]
  for (let idx = left - 1; idx < right; idx++) {
    result = (result + subarraySums[idx]) % MOD;
  }

  return result;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(rangeSum([1, 2, 3, 4], 4, 1, 5), 13, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(rangeSum([1, 2, 3, 4], 4, 3, 4), 6, 'Test 2 Failed');

  // Test 3: Example 3
  assert.strictEqual(rangeSum([1, 2, 3, 4], 4, 1, 10), 50, 'Test 3 Failed');

  // Test 4: Single element array
  assert.strictEqual(rangeSum([7], 1, 1, 1), 7, 'Test 4 Failed');

  // Test 5: All identical elements
  // nums = [2, 2], subarray sums: [2, 2, 4]
  // left = 1, right = 3 -> sum = 8
  assert.strictEqual(rangeSum([2, 2], 2, 1, 3), 8, 'Test 5 Failed');

  console.log('All tests passed for 04-Range-Sum-of-Sorted-Subarray-Sums-PrefixSum!');
}

if (require.main === module) {
  runTests();
}

module.exports = { rangeSum };
