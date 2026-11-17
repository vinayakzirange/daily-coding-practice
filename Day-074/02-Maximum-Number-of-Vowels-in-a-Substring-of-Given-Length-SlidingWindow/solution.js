/**
 * Problem: Maximum Number of Vowels in a Substring of Given Length (LeetCode 1456)
 * Difficulty: Medium
 * Category: String / Sliding Window
 *
 * Description:
 * Given a string s and an integer k, return the maximum number of vowel letters
 * in any substring of s with length k.
 *
 * Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
 *
 * Example 1:
 *   Input: s = "abciiidef", k = 3
 *   Output: 3
 *   Explanation: The substring "iii" contains 3 vowel letters.
 *
 * Example 2:
 *   Input: s = "aeiou", k = 2
 *   Output: 2
 *   Explanation: Any substring of length 2 contains 2 vowels.
 *
 * Example 3:
 *   Input: s = "leetcode", k = 3
 *   Output: 2
 *   Explanation: "lee", "eet" and "ode" contain 2 vowels.
 *
 * Constraints:
 *   - 1 <= s.length <= 10^5
 *   - s consists of lowercase English letters.
 *   - 1 <= k <= s.length
 */

/**
 * Finds the maximum number of vowels in any substring of length k using a sliding window.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function maxVowels(s, k) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

  // Count vowels in the first window of size k
  let currentVowels = 0;
  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) {
      currentVowels++;
    }
  }

  let maxVowelsCount = currentVowels;

  // Slide the window across the rest of the string
  for (let i = k; i < s.length; i++) {
    if (vowels.has(s[i])) currentVowels++;
    if (vowels.has(s[i - k])) currentVowels--;

    if (currentVowels > maxVowelsCount) {
      maxVowelsCount = currentVowels;
      if (maxVowelsCount === k) return k; // Early exit if window is entirely vowels
    }
  }

  return maxVowelsCount;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(maxVowels('abciiidef', 3), 3, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(maxVowels('aeiou', 2), 2, 'Test 2 Failed');

  // Test 3: Example 3
  assert.strictEqual(maxVowels('leetcode', 3), 2, 'Test 3 Failed');

  // Test 4: No vowels
  assert.strictEqual(maxVowels('rhythms', 4), 0, 'Test 4 Failed');

  // Test 5: k equals string length
  assert.strictEqual(maxVowels('interview', 9), 4, 'Test 5 Failed');

  // Test 6: Single character vowel
  assert.strictEqual(maxVowels('a', 1), 1, 'Test 6 Failed');

  console.log('All tests passed for 02-Maximum-Number-of-Vowels-in-a-Substring-of-Given-Length-SlidingWindow!');
}

if (require.main === module) {
  runTests();
}

module.exports = { maxVowels };
