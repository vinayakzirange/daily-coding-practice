/**
 * Problem: Longest Happy String (LeetCode 1405)
 * Difficulty: Medium
 * Category: String / Greedy / Simulation / Heap
 *
 * Description:
 * A string s is called happy if it satisfies the following conditions:
 *   - s only contains the letters 'a', 'b', and 'c'.
 *   - s does not contain any of "aaa", "bbb", or "ccc" as a substring.
 *   - s contains at most a occurrences of the letter 'a'.
 *   - s contains at most b occurrences of the letter 'b'.
 *   - s contains at most c occurrences of the letter 'c'.
 *
 * Given three integers a, b, and c, return the longest possible happy string.
 * If there are multiple longest happy strings, return any of them.
 * If no such string can be made, return the empty string "".
 *
 * Example 1:
 *   Input: a = 1, b = 1, c = 7
 *   Output: "ccaccbcc" (or similar valid permutation)
 *
 * Example 2:
 *   Input: a = 7, b = 1, c = 0
 *   Output: "aabaa"
 *
 * Constraints:
 *   - 0 <= a, b, c <= 100
 *   - a + b + c > 0
 */

/**
 * Greedily appends the most frequent character that does not violate the "no 3 consecutive" rule.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
function longestDiverseString(a, b, c) {
  const counts = [
    { char: 'a', count: a },
    { char: 'b', count: b },
    { char: 'c', count: c }
  ];

  const result = [];

  while (true) {
    // Sort descending by remaining counts
    counts.sort((x, y) => y.count - x.count);

    const len = result.length;
    let appended = false;

    for (let i = 0; i < 3; i++) {
      const { char, count } = counts[i];
      if (count === 0) continue;

      // Check if picking this char causes 3 consecutive identical characters
      if (len >= 2 && result[len - 1] === char && result[len - 2] === char) {
        continue;
      }

      // Valid character found: append and decrement
      result.push(char);
      counts[i].count -= 1;
      appended = true;
      break;
    }

    // If no character can be legally added, we are finished
    if (!appended) break;
  }

  return result.join('');
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  function isValidHappy(str, a, b, c) {
    // Check no 3 consecutive
    if (str.includes('aaa') || str.includes('bbb') || str.includes('ccc')) return false;

    // Check count limits
    let countA = 0, countB = 0, countC = 0;
    for (const ch of str) {
      if (ch === 'a') countA++;
      else if (ch === 'b') countB++;
      else if (ch === 'c') countC++;
      else return false;
    }
    return countA <= a && countB <= b && countC <= c;
  }

  // Test 1: a = 1, b = 1, c = 7
  const res1 = longestDiverseString(1, 1, 7);
  assert.ok(isValidHappy(res1, 1, 1, 7), 'Test 1 Invalid');
  assert.strictEqual(res1.length, 8, 'Test 1 Length mismatch');

  // Test 2: a = 7, b = 1, c = 0
  const res2 = longestDiverseString(7, 1, 0);
  assert.ok(isValidHappy(res2, 7, 1, 0), 'Test 2 Invalid');
  assert.strictEqual(res2.length, 5, 'Test 2 Length mismatch'); // "aabaa"

  // Test 3: a = 0, b = 0, c = 5 -> "cc" (can only take 2)
  const res3 = longestDiverseString(0, 0, 5);
  assert.strictEqual(res3, 'cc', 'Test 3 Failed');

  // Test 4: a = 2, b = 2, c = 1
  const res4 = longestDiverseString(2, 2, 1);
  assert.ok(isValidHappy(res4, 2, 2, 1));
  assert.strictEqual(res4.length, 5, 'Test 4 Length mismatch');

  // Test 5: a = 0, b = 0, c = 0
  const res5 = longestDiverseString(0, 0, 0);
  assert.strictEqual(res5, '', 'Test 5 Failed');

  console.log('All tests passed for 04-Longest-Happy-String-Greedy!');
}

if (require.main === module) {
  runTests();
}

module.exports = { longestDiverseString };
