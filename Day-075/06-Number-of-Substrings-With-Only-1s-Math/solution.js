/**
 * Problem: Number of Substrings With Only 1s (LeetCode 1513)
 * Difficulty: Medium
 * Category: Math / String
 *
 * Description:
 * Given a binary string s, return the number of substrings with all characters 1's.
 * Since the answer may be too large, return it modulo 10^9 + 7.
 *
 * Example 1:
 *   Input: s = "0110111"
 *   Output: 9
 *   Explanation: There are 9 substring in total with only 1's characters:
 *                "1" -> 5 times.
 *                "11" -> 3 times.
 *                "111" -> 1 time.
 *
 * Example 2:
 *   Input: s = "101"
 *   Output: 2
 *   Explanation: Substrings are "1" at index 0 and "1" at index 2.
 *
 * Example 3:
 *   Input: s = "111111"
 *   Output: 21
 *   Explanation: Each substring contains only 1's characters.
 *
 * Constraints:
 *   - 1 <= s.length <= 10^5
 *   - s[i] is either '0' or '1'.
 */

/**
 * Counts substrings composed entirely of '1's modulo 10^9 + 7.
 *
 * Simple Linear Scan:
 * Maintain the current streak of consecutive '1's.
 * Each additional '1' in a streak of length k adds k new substrings ending at that index.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {string} s
 * @return {number}
 */
function numSub(s) {
  const MOD = 1000000007;
  let totalSubstrings = 0;
  let currentStreak = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') {
      currentStreak++;
      totalSubstrings = (totalSubstrings + currentStreak) % MOD;
    } else {
      currentStreak = 0;
    }
  }

  return totalSubstrings;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(numSub('0110111'), 9, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(numSub('101'), 2, 'Test 2 Failed');

  // Test 3: Example 3 (6 ones -> 6 * 7 / 2 = 21)
  assert.strictEqual(numSub('111111'), 21, 'Test 3 Failed');

  // Test 4: All zeros
  assert.strictEqual(numSub('00000'), 0, 'Test 4 Failed');

  // Test 5: Single 1
  assert.strictEqual(numSub('1'), 1, 'Test 5 Failed');

  // Test 6: Single 0
  assert.strictEqual(numSub('0'), 0, 'Test 6 Failed');

  console.log('All tests passed for 06-Number-of-Substrings-With-Only-1s-Math!');
}

if (require.main === module) {
  runTests();
}

module.exports = { numSub };
