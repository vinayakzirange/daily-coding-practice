/**
 * Problem: Check If Array Pairs Are Divisible by k (LeetCode 1497)
 * Difficulty: Medium
 * Category: Array / Hash Table / Counting / Math
 *
 * Description:
 * Given an array of integers arr of even length n and an integer k.
 *
 * We want to divide the array into exactly n / 2 pairs such that the sum of each
 * pair is divisible by k.
 *
 * Return true If you can find a way to do that or false otherwise.
 *
 * Example 1:
 *   Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
 *   Output: true
 *   Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10), all can be divided by 5.
 *
 * Example 2:
 *   Input: arr = [1,2,3,4,5,6], k = 7
 *   Output: true
 *   Explanation: Pairs are (1,6),(2,5) and(3,4).
 *
 * Example 3:
 *   Input: arr = [1,2,3,4,5,6], k = 10
 *   Output: false
 *
 * Constraints:
 *   - arr.length == n
 *   - 1 <= n <= 10^5
 *   - n is even.
 *   - -10^9 <= arr[i] <= 10^9
 *   - 1 <= k <= 10^5
 */

/**
 * Checks if array can be partitioned into pairs whose sums are multiples of k.
 *
 * Simple Modulo Counting:
 * - Two numbers a and b have (a + b) % k == 0 if:
 *   - (a % k == 0 and b % k == 0) -> requires an even count of remainder 0 elements.
 *   - (a % k == r and b % k == k - r) -> requires count[r] === count[k - r].
 *
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 *
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */
function canArrange(arr, k) {
  const remainderCounts = new Array(k).fill(0);

  // Normalize negative modulo: ((x % k) + k) % k
  for (const num of arr) {
    const rem = ((num % k) + k) % k;
    remainderCounts[rem]++;
  }

  // Remainder 0 elements must pair with each other
  if (remainderCounts[0] % 2 !== 0) {
    return false;
  }

  // Check reciprocal remainders
  const half = Math.floor(k / 2);
  for (let r = 1; r <= half; r++) {
    if (r === k - r) {
      // When k is even and r = k / 2, remainder r must pair with itself
      if (remainderCounts[r] % 2 !== 0) {
        return false;
      }
    } else {
      if (remainderCounts[r] !== remainderCounts[k - r]) {
        return false;
      }
    }
  }

  return true;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(canArrange([1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5), true, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(canArrange([1, 2, 3, 4, 5, 6], 7), true, 'Test 2 Failed');

  // Test 3: Example 3
  assert.strictEqual(canArrange([1, 2, 3, 4, 5, 6], 10), false, 'Test 3 Failed');

  // Test 4: Negative numbers
  // -1 % 5 = 4, 1 % 5 = 1 -> (-1 + 1) = 0 is divisible by 5
  assert.strictEqual(canArrange([-1, 1, -2, 2, -3, 3, -4, 4], 5), true, 'Test 4 Failed');

  // Test 5: All elements zero
  assert.strictEqual(canArrange([0, 0, 0, 0], 3), true, 'Test 5 Failed');

  // Test 6: Even k with elements at k / 2
  // k = 4, elements are [2, 2, 2, 2] -> 2 pairs of (2, 2)
  assert.strictEqual(canArrange([2, 2, 2, 2], 4), true, 'Test 6 Failed');

  // Test 7: Odd count of k / 2
  assert.strictEqual(canArrange([2, 2, 2, 6], 4), true, 'Test 7 Failed'); // 6 % 4 = 2, total 4 elements with rem 2

  console.log('All tests passed for 02-Check-If-Array-Pairs-Are-Divisible-by-k-Modulo!');
}

if (require.main === module) {
  runTests();
}

module.exports = { canArrange };
