/**
 * Problem: Minimum Suffix Flips (LeetCode 1529)
 * Difficulty: Medium
 * Category: String / Greedy
 *
 * Description:
 * You are given a 0-indexed binary string target of length n. You have another
 * binary string s of length n that is initially all zeros. You want to make s equal to target.
 *
 * In one operation, you can pick an index i where 0 <= i < n and flip all bits in
 * the suffix s[i..n-1]. Flipping means changing '0' to '1' and '1' to '0'.
 *
 * Return the minimum number of operations needed to make s equal to target.
 *
 * Example 1:
 *   Input: target = "10111"
 *   Output: 3
 *   Explanation: Initially, s = "00000".
 *                Choose index i = 0: "00000" -> "11111"
 *                Choose index i = 1: "11111" -> "10000"
 *                Choose index i = 2: "10000" -> "10111"
 *                We need at least 3 operations to form target.
 *
 * Example 2:
 *   Input: target = "101"
 *   Output: 3
 *
 * Example 3:
 *   Input: target = "00000"
 *   Output: 0
 *   Explanation: We do not need any operations since s is already equal to target.
 *
 * Constraints:
 *   - n == target.length
 *   - 1 <= n <= 10^5
 *   - target[i] is either '0' or '1'.
 */

/**
 * Calculates the minimum number of suffix flips to match the target string.
 *
 * Simple Greedy State Machine:
 * - Since each flip at index i changes all characters from i to the end,
 *   the effect propagates forward.
 * - We can maintain the current effective bit (initially '0').
 * - Whenever target[i] differs from currentBit, we MUST perform a flip at index i.
 * - The new effective state becomes target[i].
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {string} target
 * @return {number}
 */
function minFlips(target) {
  let flips = 0;
  let currentBit = '0';

  for (let i = 0; i < target.length; i++) {
    if (target[i] !== currentBit) {
      flips++;
      currentBit = target[i];
    }
  }

  return flips;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(minFlips('10111'), 3, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(minFlips('101'), 3, 'Test 2 Failed');

  // Test 3: Example 3 (already all zeros)
  assert.strictEqual(minFlips('00000'), 0, 'Test 3 Failed');

  // Test 4: Single '1'
  assert.strictEqual(minFlips('1'), 1, 'Test 4 Failed');

  // Test 5: Single '0'
  assert.strictEqual(minFlips('0'), 0, 'Test 5 Failed');

  // Test 6: All '1's
  assert.strictEqual(minFlips('1111'), 1, 'Test 6 Failed');

  // Test 7: Alternating '0' and '1': "0101" -> 3 flips
  assert.strictEqual(minFlips('0101'), 3, 'Test 7 Failed');

  console.log('All tests passed for 08-Minimum-Suffix-Flips-Greedy!');
}

if (require.main === module) {
  runTests();
}

module.exports = { minFlips };
