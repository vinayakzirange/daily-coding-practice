/**
 * Problem: Sort Integers by The Power Value (LeetCode 1387)
 * Difficulty: Medium
 * Category: Dynamic Programming / Memoization / Sorting
 *
 * Description:
 * The power of an integer x is defined as the number of steps needed to transform
 * x into 1 using the following steps:
 *   - if x is even then x = x / 2
 *   - if x is odd then x = 3 * x + 1
 *
 * For example, the power of x = 3 is 7 because 3 needs 7 steps to become 1:
 *   3 --> 10 --> 5 --> 16 --> 8 --> 4 --> 2 --> 1.
 *
 * Given three integers lo, hi and k. The task is to sort all integers in the
 * interval [lo, hi] by the power value in ascending order, if two or more
 * integers have the same power value sort them by ascending order.
 *
 * Return the kth integer in the range [lo, hi] sorted by the power value.
 *
 * Notice that for any integer x (lo <= x <= hi) it is guaranteed that x will
 * transform into 1 using these steps and that the power of x is within 32 bit signed integer.
 *
 * Example 1:
 *   Input: lo = 12, hi = 15, k = 2
 *   Output: 13
 *   Explanation: The power of 12 is 9 (12 --> 6 --> 3 --> 10 --> 5 --> 16 --> 8 --> 4 --> 2 --> 1)
 *                The power of 13 is 9
 *                The power of 14 is 17
 *                The power of 15 is 17
 *                The array sorted by power is [12, 13, 14, 15]. The 2nd element is 13.
 *
 * Example 2:
 *   Input: lo = 7, hi = 11, k = 4
 *   Output: 7
 *   Explanation: The power array is [16, 3, 19, 6, 14] for integers [7, 8, 9, 10, 11].
 *                Sorted order: [8, 10, 11, 7, 9]. 4th element is 7.
 *
 * Constraints:
 *   - 1 <= lo <= hi <= 1000
 *   - 1 <= k <= hi - lo + 1
 */

const memo = new Map([[1, 0]]);

/**
 * Computes the Collatz power value of x with memoization.
 *
 * @param {number} x
 * @return {number}
 */
function getPower(x) {
  if (memo.has(x)) {
    return memo.get(x);
  }

  const next = x % 2 === 0 ? x / 2 : 3 * x + 1;
  const power = 1 + getPower(next);
  memo.set(x, power);
  return power;
}

/**
 * Returns the kth integer in [lo, hi] sorted by power value, then by value.
 *
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */
function getKth(lo, hi, k) {
  const nums = [];
  for (let i = lo; i <= hi; i++) {
    nums.push(i);
  }

  nums.sort((a, b) => {
    const pa = getPower(a);
    const pb = getPower(b);
    if (pa !== pb) {
      return pa - pb;
    }
    return a - b;
  });

  return nums[k - 1];
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(getKth(12, 15, 2), 13, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(getKth(7, 11, 4), 7, 'Test 2 Failed');

  // Test 3: Single element range
  assert.strictEqual(getKth(1, 1, 1), 1, 'Test 3 Failed');

  // Test 4: Power of powers of 2
  // 1 -> 0, 2 -> 1, 4 -> 2, 8 -> 3
  assert.strictEqual(getKth(1, 4, 1), 1, 'Test 4 Failed');
  assert.strictEqual(getKth(1, 4, 2), 2, 'Test 4 Failed');
  assert.strictEqual(getKth(1, 4, 3), 4, 'Test 4 Failed');

  // Test 5: lo = 10, hi = 20, k = 5
  assert.strictEqual(getKth(10, 20, 5), 13, 'Test 5 Failed');

  console.log('All tests passed for 08-Sort-Integers-by-The-Power-Value-Sorting!');
}

if (require.main === module) {
  runTests();
}

module.exports = { getPower, getKth };
