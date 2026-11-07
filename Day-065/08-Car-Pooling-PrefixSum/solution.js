/**
 * LeetCode 1094: Car Pooling (Medium)
 * https://leetcode.com/problems/car-pooling/
 *
 * There is a car with capacity empty seats. The vehicle only drives east (i.e. it cannot
 * turn around and drive west).
 *
 * You are given the integer capacity and an array trips where trips[i] = [numPassengers_i, from_i, to_i]
 * indicates that the ith trip has numPassengers_i passengers and the locations to pick them up
 * and drop them off are from_i and to_i respectively. The locations are given as the number of
 * kilometers due east from the car's initial location.
 *
 * Return true if it is possible to pick up and drop off all passengers for all the given trips,
 * or false otherwise.
 *
 * Example 1:
 * Input: trips = [[2,1,5],[3,3,7]], capacity = 4
 * Output: false
 *
 * Example 2:
 * Input: trips = [[2,1,5],[3,3,7]], capacity = 5
 * Output: true
 *
 * Constraints:
 * - 1 <= trips.length <= 1000
 * - trips[i].length == 3
 * - 1 <= numPassengers_i <= 100
 * - 0 <= from_i < to_i <= 1000
 * - 1 <= capacity <= 10^5
 *
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
function carPooling(trips, capacity) {
    // Difference array tracking passenger deltas at each location kilometer
    // Since from_i, to_i <= 1000, array size 1001 is sufficient
    const diff = new Array(1001).fill(0);

    for (const [num, from, to] of trips) {
        diff[from] += num;
        diff[to] -= num; // Passengers get off at location `to`
    }

    let currentLoad = 0;
    for (let i = 0; i <= 1000; i++) {
        currentLoad += diff[i];
        if (currentLoad > capacity) {
            return false;
        }
    }

    return true;
}

// Unit tests
function runTests() {
    // Test 1: Example 1 -> false (at location 3, passengers = 2 + 3 = 5 > 4)
    console.assert(carPooling([[2, 1, 5], [3, 3, 7]], 4) === false, "Test 1 Failed");

    // Test 2: Example 2 -> true (capacity 5 is sufficient)
    console.assert(carPooling([[2, 1, 5], [3, 3, 7]], 5) === true, "Test 2 Failed");

    // Test 3: Drop-off and pick-up at the exact same location
    // Trip 1 drops off 2 at loc 3, Trip 2 picks up 2 at loc 3 -> capacity 2 is valid!
    console.assert(carPooling([[2, 1, 3], [2, 3, 5]], 2) === true, "Test 3 Failed");

    // Test 4: Single trip within capacity
    console.assert(carPooling([[5, 0, 10]], 5) === true, "Test 4 Failed");

    // Test 5: Single trip exceeding capacity
    console.assert(carPooling([[6, 0, 10]], 5) === false, "Test 5 Failed");

    console.log("All Car Pooling tests passed successfully!");
}

runTests();
