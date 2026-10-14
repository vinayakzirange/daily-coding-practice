/**
 * Problem: Merge Intervals (LeetCode 56)
 * Difficulty: Medium
 * Topic: Array / Sorting / Intervals
 *
 * Description:
 * Given an array of intervals where intervals[i] = [start_i, end_i], merge
 * all overlapping intervals, and return an array of the non-overlapping
 * intervals that cover all the intervals in the input.
 *
 * Example 1:
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 *
 * Example 2:
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 *
 * Constraints:
 * - 1 <= intervals.length <= 10^4
 * - intervals[i].length == 2
 * - 0 <= start_i <= end_i <= 10^4
 *
 * Complexity Analysis:
 * - Time Complexity: O(n log n) sorting intervals by start point.
 * - Space Complexity: O(n) space needed for sorting and resulting merged array.
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    if (!intervals || intervals.length <= 1) {
        return intervals;
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        // If current interval overlaps with previous merged interval
        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            merged.push(current);
        }
    }

    return merged;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function intervalsEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i][0] !== b[i][0] || a[i][1] !== b[i][1]) return false;
    }
    return true;
}

const testCases = [
    {
        intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
        expected: [[1, 6], [8, 10], [15, 18]]
    },
    {
        intervals: [[1, 4], [4, 5]],
        expected: [[1, 5]]
    },
    {
        intervals: [[1, 4], [0, 4]],
        expected: [[0, 4]]
    },
    {
        intervals: [[1, 4], [2, 3]],
        expected: [[1, 4]]
    },
    {
        intervals: [[1, 4]],
        expected: [[1, 4]]
    },
    {
        intervals: [[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]],
        expected: [[1, 10]]
    }
];

testCases.forEach((tc, idx) => {
    const copy = tc.intervals.map(item => [...item]);
    const result = merge(copy);
    if (!intervalsEqual(result, tc.expected)) {
        console.error(`Test ${idx + 1} Failed: got ${JSON.stringify(result)}, expected ${JSON.stringify(tc.expected)}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: input count=${tc.intervals.length} -> merged count=${result.length}`);
});

console.log("\nAll Merge Intervals tests passed successfully!");
