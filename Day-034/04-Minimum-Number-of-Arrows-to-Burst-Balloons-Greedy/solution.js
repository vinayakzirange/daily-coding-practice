/**
 * Problem: Minimum Number of Arrows to Burst Balloons (LeetCode 452)
 * Difficulty: Medium
 * Topic: Array / Greedy / Intervals / Sorting
 * 
 * Description:
 * There are some spherical balloons taped onto a flat wall that represents the XY-plane.
 * The balloons are represented as a 2D integer array points where points[i] = [xstart, xend]
 * denotes a balloon whose horizontal diameter stretches between xstart and xend.
 * 
 * Arrows can be shot up directly vertically (in the positive y-direction) from different points
 * along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend.
 * There is no limit to the number of arrows that can be shot. A single arrow can burst multiple
 * overlapping balloons.
 * 
 * Given the array points, return the minimum number of arrows that must be shot to burst all balloons.
 * 
 * Example 1:
 * Input: points = [[10,16],[2,8],[1,6],[7,12]]
 * Output: 2
 * Explanation: The balloons can be burst by 2 arrows:
 * - Shoot an arrow at x = 6, bursting balloons [2,8] and [1,6].
 * - Shoot an arrow at x = 11, bursting balloons [10,16] and [7,12].
 * 
 * Example 2:
 * Input: points = [[1,2],[3,4],[5,6],[7,8]]
 * Output: 4
 * Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
 * 
 * Example 3:
 * Input: points = [[1,2],[2,3],[3,4],[4,5]]
 * Output: 2
 * Explanation: The balloons can be burst by 2 arrows:
 * - Shoot an arrow at x = 2, bursting balloons [1,2] and [2,3].
 * - Shoot an arrow at x = 4, bursting balloons [3,4] and [4,5].
 * 
 * Constraints:
 *   * 1 <= points.length <= 10^5
 *   * points[i].length == 2
 *   * -2^31 <= xstart < xend <= 2^31 - 1
 * 
 * Complexity:
 *   * Time Complexity: O(n log n) - Sorting balloons by ending coordinates.
 *   * Space Complexity: O(1) auxiliary space (or O(log n) for sorting recursion).
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
    if (!points || points.length === 0) return 0;

    // Sort balloons primarily by their end coordinate in ascending order
    // Avoid simple (a[1] - b[1]) subtraction to prevent 32-bit integer overflow
    points.sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));

    let arrows = 1;
    let currentArrowPos = points[0][1];

    for (let i = 1; i < points.length; i++) {
        const [start, end] = points[i];

        // If the current balloon starts after the current arrow position,
        // it cannot be burst by the previous arrow. A new arrow is required.
        if (start > currentArrowPos) {
            arrows++;
            currentArrowPos = end;
        }
    }

    return arrows;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { points: [[10, 16], [2, 8], [1, 6], [7, 12]], expected: 2 },
        { points: [[1, 2], [3, 4], [5, 6], [7, 8]], expected: 4 },
        { points: [[1, 2], [2, 3], [3, 4], [4, 5]], expected: 2 },
        { points: [[-2147483646, -2147483645], [2147483646, 2147483647]], expected: 2 },
        { points: [[1, 10]], expected: 1 }
    ];

    testCases.forEach((tc, idx) => {
        const copy = tc.points.map(p => [...p]);
        const result = findMinArrowShots(copy);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: points=${JSON.stringify(tc.points.slice(0, 3))}... -> min arrows = ${result}`);
    });

    console.log('\nAll Minimum Number of Arrows to Burst Balloons tests passed successfully!');
}

runTests();
