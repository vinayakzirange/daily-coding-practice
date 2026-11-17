/**
 * Problem: Check If a String Contains All Binary Codes of Size K (LeetCode 1461)
 * Difficulty: Medium
 * Category: Hash Table / String / Bit Manipulation / Set
 *
 * Description:
 * Given a binary string s and an integer k, return true if every binary code
 * of length k is a substring of s. Otherwise, return false.
 *
 * Example 1:
 *   Input: s = "00110110", k = 2
 *   Output: true
 *   Explanation: The binary codes of length 2 are "00", "01", "10" and "11".
 *                They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
 *
 * Example 2:
 *   Input: s = "0110", k = 1
 *   Output: true
 *   Explanation: The binary codes of length 1 are "0" and "1", both of which exist in s.
 *
 * Example 3:
 *   Input: s = "0110", k = 2
 *   Output: false
 *   Explanation: The binary code "00" is not present in s.
 *
 * Constraints:
 *   - 1 <= s.length <= 5 * 10^5
 *   - s[i] is either '0' or '1'.
 *   - 1 <= k <= 20
 */

/**
 * Checks whether s contains all 2^k distinct binary substrings of length k.
 *
 * Simple Logic:
 * Total distinct binary strings of length k is 2^k (i.e. 1 << k).
 * We slide a window of size k across s and collect all substrings into a Set.
 * If set.size reaches 2^k, all codes are present!
 *
 * Time Complexity: O(n * k)
 * Space Complexity: O(2^k * k)
 *
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
function hasAllCodes(s, k) {
  const needed = 1 << k;

  // A string must have at least (2^k + k - 1) characters to contain all 2^k substrings
  if (s.length < needed + k - 1) {
    return false;
  }

  const seen = new Set();
  const limit = s.length - k;

  for (let i = 0; i <= limit; i++) {
    seen.add(s.substring(i, i + k));
    if (seen.size === needed) {
      return true; // Early termination
    }
  }

  return seen.size === needed;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(hasAllCodes('00110110', 2), true, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(hasAllCodes('0110', 1), true, 'Test 2 Failed');

  // Test 3: Example 3
  assert.strictEqual(hasAllCodes('0110', 2), false, 'Test 3 Failed');

  // Test 4: String too short
  assert.strictEqual(hasAllCodes('0', 2), false, 'Test 4 Failed');

  // Test 5: All 8 codes of length 3 (2^3 = 8)
  // Substrings of "0001011100":
  // "000", "001", "010", "101", "011", "111", "110", "100" -> all 8 present!
  assert.strictEqual(hasAllCodes('0001011100', 3), true, 'Test 5 Failed');

  console.log('All tests passed for 04-Check-If-a-String-Contains-All-Binary-Codes-of-Size-K-Set!');
}

if (require.main === module) {
  runTests();
}

module.exports = { hasAllCodes };
