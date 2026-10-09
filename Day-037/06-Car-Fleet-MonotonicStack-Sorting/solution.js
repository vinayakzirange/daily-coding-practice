/**
 * Problem: Car Fleet (LeetCode 853)
 * Difficulty: Medium
 * Topic: Array / Stack / Sorting / Greedy Simulation
 * 
 * Description:
 * There are n cars at given miles away from the starting mile 0, traveling to reach 
 * the mile target.
 * 
 * You are given two integer array position and speed, both of length n, where 
 * position[i] is the starting position of the ith car and speed[i] is the speed of 
 * the ith car (in miles per hour).
 * 
 * A car cannot pass another car, but it can catch up and then travel at the same speed 
 * as the car ahead. A car fleet is some non-empty set of cars driving at the same position 
 * and same speed. Note that a single car is also considered a car fleet.
 * 
 * If a car catches up to a car fleet right at the destination point, it is still 
 * considered as part of the car fleet.
 * 
 * Return the number of car fleets that will arrive at the destination.
 * 
 * Example 1:
 * Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
 * Output: 3
 * Explanation:
 * - The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet at position 12.
 * - The car starting at 0 (speed 1) arrives in 12 hours.
 * - The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet at position 6.
 * Total 3 fleets arrive.
 * 
 * Example 2:
 * Input: target = 10, position = [3], speed = [3]
 * Output: 1
 * 
 * Example 3:
 * Input: target = 100, position = [0,2,4], speed = [4,2,1]
 * Output: 1
 * 
 * Constraints:
 *   * n == position.length == speed.length
 *   * 1 <= n <= 10^5
 *   * 0 < target <= 10^6
 *   * 0 <= position[i] < target
 *   * All the values of position are unique.
 *   * 0 < speed[i] <= 10^6
 * 
 * Complexity:
 *   * Time Complexity: O(n log n) for sorting cars by descending initial position.
 *   * Space Complexity: O(n) to store car pairs and track fleet arrival times.
 */

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
function carFleet(target, position, speed) {
    const n = position.length;
    if (n === 0) return 0;

    // Pair positions with corresponding speeds
    const cars = [];
    for (let i = 0; i < n; i++) {
        cars.push({ pos: position[i], spd: speed[i] });
    }

    // Sort cars by initial position in descending order (closest to target first)
    cars.sort((a, b) => b.pos - a.pos);

    let fleets = 0;
    let prevFleetTime = 0;

    for (let i = 0; i < n; i++) {
        // Time needed for current car to reach target independently
        const timeToReach = (target - cars[i].pos) / cars[i].spd;

        // If this car takes strictly longer than the fleet ahead,
        // it cannot catch up before reaching the target. It starts a new fleet!
        if (timeToReach > prevFleetTime) {
            fleets++;
            prevFleetTime = timeToReach;
        }
        // If timeToReach <= prevFleetTime, it catches up with the fleet ahead
        // and joins it, moving at the slower car's pace.
    }

    return fleets;
}

// Driver Tests
function runTests() {
    console.log("=== Running Car Fleet Tests ===");

    const res1 = carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]);
    console.log(`Test 1: Output=${res1}, Expected=3 | Pass: ${res1 === 3}`);

    const res2 = carFleet(10, [3], [3]);
    console.log(`Test 2: Output=${res2}, Expected=1 | Pass: ${res2 === 1}`);

    const res3 = carFleet(100, [0, 2, 4], [4, 2, 1]);
    console.log(`Test 3: Output=${res3}, Expected=1 | Pass: ${res3 === 1}`);
}

runTests();
