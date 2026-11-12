/**
 * Problem: Remove Covered Intervals (LeetCode 1288)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given an array intervals where intervals[i] = [li, ri] represent the interval [li, ri),
 * remove all intervals that are covered by another interval in the list.
 * 
 * The interval [a, b) is covered by the interval [c, d) if and only if c <= a and b <= d.
 * 
 * Return the number of remaining intervals.
 * 
 * Example 1:
 *  Input: intervals = [[1,4],[3,6],[2,8]]
 *  Output: 2
 *  Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.
 * 
 * Example 2:
 *  Input: intervals = [[1,4],[2,3]]
 *  Output: 1
 * 
 * Constraints:
 *  1 <= intervals.length <= 1000
 *  intervals[i].length == 2
 *  0 <= li < ri <= 10^5
 *  All the given intervals are unique.
 */

/**
 * Counts remaining non-covered intervals using Sorting and Greedy sweep.
 * 
 * @param {number[][]} intervals
 * @return {number}
 * 
 * Complexity:
 *  Time: O(N * log(N)) - Sorting N intervals.
 *  Space: O(1) auxiliary space (or O(log N) for sort recursion).
 */
function removeCoveredIntervals(intervals) {
    // Sort primarily by start ascending; when start times tie, sort by end descending
    // (This guarantees that an enclosing interval comes first)
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return b[1] - a[1];
    });

    let count = 0;
    let maxEnd = 0;

    for (const [start, end] of intervals) {
        // If current interval's end extends beyond all previous enclosing intervals,
        // it cannot be covered by any prior interval.
        if (end > maxEnd) {
            count++;
            maxEnd = end;
        }
    }

    return count;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(removeCoveredIntervals([[1, 4], [3, 6], [2, 8]]), 2, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(removeCoveredIntervals([[1, 4], [2, 3]]), 1, "Test 2 Failed");

    // Test 3: Disjoint intervals
    assert.strictEqual(removeCoveredIntervals([[1, 2], [3, 4], [5, 6]]), 3, "Test 3 Failed");

    // Test 4: Same start points
    assert.strictEqual(removeCoveredIntervals([[1, 5], [1, 4], [1, 3]]), 1, "Test 4 Failed");

    // Test 5: Single interval
    assert.strictEqual(removeCoveredIntervals([[10, 20]]), 1, "Test 5 Failed");

    console.log("All Remove Covered Intervals tests passed successfully!");
}

runTests();
