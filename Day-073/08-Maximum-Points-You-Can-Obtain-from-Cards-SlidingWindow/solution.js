/**
 * Problem: Maximum Points You Can Obtain from Cards (LeetCode 1423)
 * Difficulty: Medium
 * Category: Array / Sliding Window / Prefix Sum
 *
 * Description:
 * There are several cards arranged in a row, and each card has an associated number
 * of points. The points are given in the integer array cardPoints.
 *
 * In one step, you can take one card from the beginning or from the end of the row.
 * You have to take exactly k cards.
 *
 * Your score is the sum of the points of the cards you have taken.
 *
 * Given the integer array cardPoints and the integer k, return the maximum score you can obtain.
 *
 * Example 1:
 *   Input: cardPoints = [1,2,3,4,5,6,1], k = 3
 *   Output: 12
 *   Explanation: Taking the three cards on the right will give a score of 4 + 5 + 6 = 15?
 *                Wait, 5 + 6 + 1 = 12. Alternatively 1 + 2 + 1 = 4.
 *                Cards taken: right 3 cards -> 5 + 6 + 1 = 12.
 *
 * Example 2:
 *   Input: cardPoints = [2,2,2], k = 2
 *   Output: 4
 *
 * Example 3:
 *   Input: cardPoints = [9,7,7,9,7,7,9], k = 7
 *   Output: 55
 *   Explanation: You have to take all cards. Score is the sum of all elements.
 *
 * Constraints:
 *   - 1 <= cardPoints.length <= 10^5
 *   - 1 <= cardPoints[i] <= 10^4
 *   - 1 <= k <= cardPoints.length
 */

/**
 * Finds the maximum points obtainable by choosing k cards from either end.
 *
 * Strategy:
 * Taking k cards from the ends is equivalent to leaving a contiguous subarray
 * of size (n - k) with the minimum possible sum.
 *
 * Result = totalSum - minSubarraySum(windowSize = n - k)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
function maxScore(cardPoints, k) {
  const n = cardPoints.length;
  const windowSize = n - k;

  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += cardPoints[i];
  }

  // If taking all cards, return the sum of the entire array
  if (windowSize === 0) {
    return totalSum;
  }

  // Find min subarray sum of length windowSize
  let currentWindowSum = 0;
  for (let i = 0; i < windowSize; i++) {
    currentWindowSum += cardPoints[i];
  }

  let minWindowSum = currentWindowSum;

  for (let i = windowSize; i < n; i++) {
    currentWindowSum += cardPoints[i] - cardPoints[i - windowSize];
    if (currentWindowSum < minWindowSum) {
      minWindowSum = currentWindowSum;
    }
  }

  return totalSum - minWindowSum;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(maxScore([1, 2, 3, 4, 5, 6, 1], 3), 12, 'Test 1 Failed');

  // Test 2: Example 2
  assert.strictEqual(maxScore([2, 2, 2], 2), 4, 'Test 2 Failed');

  // Test 3: Example 3 (k == n)
  assert.strictEqual(maxScore([9, 7, 7, 9, 7, 7, 9], 7), 55, 'Test 3 Failed');

  // Test 4: Take from both front and back
  // cardPoints = [100, 40, 17, 9, 73, 75], k = 3
  // Taking front 1 (100) and back 2 (73 + 75) = 248 (leaves min window [40, 17, 9] = 66; 314 - 66 = 248)
  assert.strictEqual(maxScore([100, 40, 17, 9, 73, 75], 3), 248, 'Test 4 Failed');

  // Test 5: Single element
  assert.strictEqual(maxScore([10], 1), 10, 'Test 5 Failed');

  console.log('All tests passed for 08-Maximum-Points-You-Can-Obtain-from-Cards-SlidingWindow!');
}

if (require.main === module) {
  runTests();
}

module.exports = { maxScore };
