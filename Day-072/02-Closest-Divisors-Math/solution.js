/**
 * Problem: Closest Divisors (LeetCode 1362)
 * Difficulty: Medium
 * Category: Math / Number Theory
 *
 * Description:
 * Given an integer num, find two integers a and b such that:
 *   - a * b = num + 1 or a * b = num + 2
 *   - |a - b| is minimized.
 *
 * Return the two integers in any order.
 *
 * Example 1:
 *   Input: num = 8
 *   Output: [3, 3]
 *   Explanation: For num + 1 = 9, divisors are [1, 9] (diff 8) or [3, 3] (diff 0).
 *                For num + 2 = 10, divisors are [1, 10] (diff 9) or [2, 5] (diff 3).
 *                The closest pair is [3, 3].
 *
 * Example 2:
 *   Input: num = 123
 *   Output: [5, 25]
 *
 * Example 3:
 *   Input: num = 999
 *   Output: [40, 25]
 *
 * Constraints:
 *   - 1 <= num <= 10^9
 */

/**
 * Finds two divisors of (num + 1) or (num + 2) that minimize |a - b|.
 *
 * @param {number} num
 * @return {number[]}
 */
function closestDivisors(num) {
  // Start searching from floor(sqrt(num + 2)) down to 1
  for (let d = Math.floor(Math.sqrt(num + 2)); d >= 1; d--) {
    const div2 = (num + 2) % d === 0;
    const div1 = (num + 1) % d === 0;

    if (div2 && div1) {
      const pair2 = [d, (num + 2) / d];
      const pair1 = [d, (num + 1) / d];
      return Math.abs(pair2[0] - pair2[1]) < Math.abs(pair1[0] - pair1[1]) ? pair2 : pair1;
    }
    if (div2) {
      return [d, (num + 2) / d];
    }
    if (div1) {
      return [d, (num + 1) / d];
    }
  }
  return [1, num + 1];
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  function isValid(num, [a, b]) {
    const prod = a * b;
    return prod === num + 1 || prod === num + 2;
  }

  // Test 1: num = 8 -> [3, 3] (|3 - 3| = 0)
  const res1 = closestDivisors(8).sort((x, y) => x - y);
  assert.deepStrictEqual(res1, [3, 3], 'Test 1 Failed');
  assert.ok(isValid(8, res1));

  // Test 2: num = 123 -> [5, 25] (|5 - 25| = 20)
  const res2 = closestDivisors(123).sort((x, y) => x - y);
  assert.deepStrictEqual(res2, [5, 25], 'Test 2 Failed');
  assert.ok(isValid(123, res2));

  // Test 3: num = 999 -> [25, 40] (|25 - 40| = 15)
  const res3 = closestDivisors(999).sort((x, y) => x - y);
  assert.deepStrictEqual(res3, [25, 40], 'Test 3 Failed');
  assert.ok(isValid(999, res3));

  // Test 4: num = 1 -> [1, 2] (1*2 = 2 = 1+1, or 1*3=3=1+2)
  const res4 = closestDivisors(1).sort((x, y) => x - y);
  assert.deepStrictEqual(res4, [1, 2], 'Test 4 Failed');
  assert.ok(isValid(1, res4));

  // Test 5: num = 2 -> [2, 2] (2*2 = 4 = 2+2)
  const res5 = closestDivisors(2).sort((x, y) => x - y);
  assert.deepStrictEqual(res5, [2, 2], 'Test 5 Failed');
  assert.ok(isValid(2, res5));

  console.log('All tests passed for 02-Closest-Divisors-Math!');
}

if (require.main === module) {
  runTests();
}

module.exports = { closestDivisors };
