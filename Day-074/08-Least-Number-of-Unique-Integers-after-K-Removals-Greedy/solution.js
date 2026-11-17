/**
 * Problem: Least Number of Unique Integers after K Removals (LeetCode 1481)
 * Difficulty: Medium
 * Category: Array / Hash Table / Greedy / Sorting
 *
 * Description:
 * Given an array of integers arr and an integer k. Find the least number of
 * unique integers after removing exactly k elements.
 *
 * Example 1:
 *   Input: arr = [5,5,4], k = 1
 *   Output: 1
 *   Explanation: Remove 4, only 5 remains (1 unique integer).
 *
 * Example 2:
 *   Input: arr = [4,3,1,1,3,3,2], k = 3
 *   Output: 2
 *   Explanation: Remove 4, 2 and either one 3 or one 1. The remaining unique integers are 1 and 3.
 *
 * Constraints:
 *   - 1 <= arr.length <= 10^5
 *   - 1 <= arr[i] <= 10^9
 *   - 0 <= k <= arr.length
 */

/**
 * Greedily removes the elements with the lowest frequency first to minimize remaining unique integers.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 *
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
function findLeastNumOfUniqueInts(arr, k) {
  // Count frequency of each integer
  const counts = new Map();
  for (const num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  // Sort frequencies ascending
  const frequencies = Array.from(counts.values()).sort((a, b) => a - b);

  let uniqueCount = frequencies.length;

  for (const freq of frequencies) {
    if (k >= freq) {
      k -= freq;
      uniqueCount--;
    } else {
      break;
    }
  }

  return uniqueCount;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(findLeastNumOfUniqueInts([5, 5, 4], 1), 1, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(findLeastNumOfUniqueInts([4, 3, 1, 1, 3, 3, 2], 3), 2, 'Test 2 Failed');

  // Test 3: k = 0 (no removals)
  assert.strictEqual(findLeastNumOfUniqueInts([1, 2, 3], 0), 3, 'Test 3 Failed');

  // Test 4: k equals arr.length (all removed)
  assert.strictEqual(findLeastNumOfUniqueInts([1, 2, 3], 3), 0, 'Test 4 Failed');

  // Test 5: All elements identical
  assert.strictEqual(findLeastNumOfUniqueInts([7, 7, 7, 7], 2), 1, 'Test 5 Failed');

  // Test 6: Incomplete removal of a frequency
  assert.strictEqual(findLeastNumOfUniqueInts([1, 1, 2, 2, 3, 3], 3), 2, 'Test 6 Failed');

  console.log('All tests passed for 08-Least-Number-of-Unique-Integers-after-K-Removals-Greedy!');
}

if (require.main === module) {
  runTests();
}

module.exports = { findLeastNumOfUniqueInts };
