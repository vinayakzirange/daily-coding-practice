/**
 * Problem: Corporate Flight Bookings (LeetCode 1109)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * There are n flights labeled from 1 to n.
 * You are given an array of flight bookings bookings, where bookings[i] = [first_i, last_i, seats_i]
 * represents a booking for flights first_i through last_i (inclusive) with seats_i seats reserved for each flight in the range.
 * 
 * Return an array answer of length n, where answer[i] is the total number of seats reserved for flight i + 1.
 * 
 * Example 1:
 *  Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
 *  Output: [10,55,45,25,25]
 * 
 * Example 2:
 *  Input: bookings = [[1,2,10],[2,2,15]], n = 2
 *  Output: [10,25]
 * 
 * Constraints:
 *  1 <= n <= 2 * 10^4
 *  1 <= bookings.length <= 2 * 10^4
 *  bookings[i].length == 3
 *  1 <= first_i <= last_i <= n
 *  1 <= seats_i <= 10^4
 */

/**
 * Calculates the total number of reserved seats for each flight using a Difference Array.
 * 
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 * 
 * Complexity:
 *  Time: O(n + bookings.length) - Single pass over bookings and one pass to compute prefix sums.
 *  Space: O(1) auxiliary space (excluding the returned array of length n).
 */
function corpFlightBookings(bookings, n) {
    const diff = new Array(n).fill(0);

    for (let i = 0; i < bookings.length; i++) {
        const [first, last, seats] = bookings[i];
        diff[first - 1] += seats;
        if (last < n) {
            diff[last] -= seats;
        }
    }

    // Convert difference array to running prefix sums in-place
    for (let i = 1; i < n; i++) {
        diff[i] += diff[i - 1];
    }

    return diff;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const res1 = corpFlightBookings([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5);
    assert.deepStrictEqual(res1, [10, 55, 45, 25, 25], `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: Example 2
    const res2 = corpFlightBookings([[1, 2, 10], [2, 2, 15]], 2);
    assert.deepStrictEqual(res2, [10, 25], `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: Single flight
    const res3 = corpFlightBookings([[1, 1, 50]], 1);
    assert.deepStrictEqual(res3, [50], `Test 3 Failed: ${JSON.stringify(res3)}`);

    // Test 4: Disjoint intervals
    const res4 = corpFlightBookings([[1, 1, 10], [3, 4, 30]], 4);
    assert.deepStrictEqual(res4, [10, 0, 30, 30], `Test 4 Failed: ${JSON.stringify(res4)}`);

    // Test 5: Entire range covered multiple times
    const res5 = corpFlightBookings([[1, 3, 5], [1, 3, 10]], 3);
    assert.deepStrictEqual(res5, [15, 15, 15], `Test 5 Failed: ${JSON.stringify(res5)}`);

    console.log("All Corporate Flight Bookings tests passed successfully!");
}

runTests();
