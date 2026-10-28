/**
 * ====================================================================
 * Problem: Minimum Time Difference (LeetCode 539)
 * Difficulty: Medium
 * Topic: Array, Math, String, Sorting, Bucket Sort
 * ====================================================================
 * 
 * Given a list of 24-hour clock time points in "HH:MM" format, return
 * the minimum minutes difference between any two time-points in the list.
 * 
 * Example 1:
 * Input: timePoints = ["23:59","00:00"]
 * Output: 1
 * 
 * Example 2:
 * Input: timePoints = ["00:00","23:59","00:00"]
 * Output: 0
 * 
 * Constraints:
 * - 2 <= timePoints.length <= 2 * 10^4
 * - timePoints[i] is in the format "HH:MM".
 * ====================================================================
 */

/**
 * Converts time points to minutes from 00:00, sorts them, and checks
 * adjacent and circular wrap-around differences.
 * 
 * Complexity:
 * - Time: O(N log N) bounded by O(1440 log 1440) via pigeonhole principle
 * - Space: O(N) to store converted minutes
 * 
 * @param {string[]} timePoints
 * @return {number}
 */
function findMinDifference(timePoints) {
    const TOTAL_MINUTES = 24 * 60; // 1440 minutes in a day

    // Pigeonhole Principle: more than 1440 time points guarantees at least one duplicate
    if (timePoints.length > TOTAL_MINUTES) {
        return 0;
    }

    const minutes = timePoints.map(t => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    });

    minutes.sort((a, b) => a - b);

    let minDiff = TOTAL_MINUTES;

    // Check adjacent differences
    for (let i = 1; i < minutes.length; i++) {
        minDiff = Math.min(minDiff, minutes[i] - minutes[i - 1]);
        if (minDiff === 0) return 0;
    }

    // Check circular wrap-around difference between last and first
    const circularDiff = TOTAL_MINUTES + minutes[0] - minutes[minutes.length - 1];
    minDiff = Math.min(minDiff, circularDiff);

    return minDiff;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: ["23:59","00:00"] -> 1
    console.assert(
        findMinDifference(["23:59", "00:00"]) === 1,
        "Test 1 Failed: expected 1"
    );

    // Test 2: ["00:00","23:59","00:00"] -> 0
    console.assert(
        findMinDifference(["00:00", "23:59", "00:00"]) === 0,
        "Test 2 Failed: expected 0"
    );

    // Test 3: ["01:01","02:01","03:00"] -> 59
    console.assert(
        findMinDifference(["01:01", "02:01", "03:00"]) === 59,
        "Test 3 Failed: expected 59"
    );

    // Test 4: ["12:30", "12:35"] -> 5
    console.assert(
        findMinDifference(["12:30", "12:35"]) === 5,
        "Test 4 Failed: expected 5"
    );

    console.log("All Minimum Time Difference tests passed successfully!");
}

module.exports = { findMinDifference };
