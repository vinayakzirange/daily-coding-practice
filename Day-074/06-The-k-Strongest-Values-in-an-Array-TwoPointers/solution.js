/**
 * Problem: The k Strongest Values in an Array (LeetCode 1471)
 * Difficulty: Medium
 * Category: Array / Two Pointers / Sorting
 *
 * Description:
 * Given an array of integers arr and an integer k.
 *
 * A value arr[i] is said to be stronger than arr[j] if:
 *   |arr[i] - m| > |arr[j] - m| (where m is the median of the array)
 * If |arr[i] - m| == |arr[j] - m|, then arr[i] is stronger than arr[j] if arr[i] > arr[j].
 *
 * The median of an array of length n is defined as:
 *   arr[(n - 1) / 2] in the sorted array (0-indexed).
 *
 * Return a list of the k strongest values in the array in any order.
 *
 * Example 1:
 *   Input: arr = [1,2,3,4,5], k = 2
 *   Output: [5,1]
 *   Explanation: Median is 3. Strengths: |1-3|=2, |2-3|=1, |3-3|=0, |4-3|=1, |5-3|=2.
 *                Strongest two are 5 (diff 2, val 5) and 1 (diff 2, val 1).
 *
 * Example 2:
 *   Input: arr = [1,1,3,5,5], k = 2
 *   Output: [5,5]
 *
 * Example 3:
 *   Input: arr = [6,7,11,7,6,8], k = 5
 *   Output: [11,8,6,6,7]
 *
 * Constraints:
 *   - 1 <= arr.length <= 10^5
 *   - -10^5 <= arr[i] <= 10^5
 *   - 1 <= k <= arr.length
 */

/**
 * Finds the k strongest values using a sorted two-pointer approach.
 *
 * Simple Two-Pointer Logic:
 * After sorting arr, the median is m = arr[Math.floor((n - 1) / 2)].
 * The strongest elements must be situated at either the far-left (smallest values)
 * or far-right (largest values).
 * We maintain two pointers (left = 0, right = n - 1) and repeatedly take the stronger
 * element until k elements are collected.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) auxiliary
 *
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
function getStrongest(arr, k) {
  arr.sort((a, b) => a - b);
  const m = arr[Math.floor((arr.length - 1) / 2)];

  let left = 0;
  let right = arr.length - 1;
  const result = [];

  while (result.length < k) {
    const diffLeft = Math.abs(arr[left] - m);
    const diffRight = Math.abs(arr[right] - m);

    // If diffRight > diffLeft, or diffRight == diffLeft and arr[right] > arr[left]
    if (diffRight >= diffLeft) {
      result.push(arr[right]);
      right--;
    } else {
      result.push(arr[left]);
      left++;
    }
  }

  return result;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  const res1 = getStrongest([1, 2, 3, 4, 5], 2).sort((a, b) => a - b);
  assert.deepStrictEqual(res1, [1, 5], 'Test 1 Failed');

  // Test 2: Example 2
  const res2 = getStrongest([1, 1, 3, 5, 5], 2).sort((a, b) => a - b);
  assert.deepStrictEqual(res2, [5, 5], 'Test 2 Failed');

  // Test 3: Example 3
  const res3 = getStrongest([6, 7, 11, 7, 6, 8], 5).sort((a, b) => a - b);
  assert.deepStrictEqual(res3, [6, 6, 7, 8, 11], 'Test 3 Failed');

  // Test 4: Single element, k = 1
  const res4 = getStrongest([42], 1);
  assert.deepStrictEqual(res4, [42], 'Test 4 Failed');

  // Test 5: Negative numbers
  const res5 = getStrongest([-7, 22, 17, 3], 2).sort((a, b) => a - b);
  // Sorted: [-7, 3, 17, 22], median is arr[1] = 3.
  // diffs: |-7-3|=10, |3-3|=0, |17-3|=14, |22-3|=19 -> strongest 22 and 17
  assert.deepStrictEqual(res5, [17, 22], 'Test 5 Failed');

  console.log('All tests passed for 06-The-k-Strongest-Values-in-an-Array-TwoPointers!');
}

if (require.main === module) {
  runTests();
}

module.exports = { getStrongest };
