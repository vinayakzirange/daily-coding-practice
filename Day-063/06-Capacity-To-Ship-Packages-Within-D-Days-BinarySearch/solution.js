/**
 * LeetCode 1011: Capacity To Ship Packages Within D Days (Medium)
 * https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
 *
 * A conveyor belt has packages that must be shipped from one port to another within days days.
 *
 * The ith package on the conveyor belt has a weight of weights[i]. Each day, we load
 * the ship with packages on the conveyor belt (in the order given by weights). We may not load
 * more weight than the maximum weight capacity of the ship.
 *
 * Return the least weight capacity of the ship that will result in all the packages
 * on the conveyor belt being shipped within days days.
 *
 * Example 1:
 * Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
 * Output: 15
 * Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
 * 1st day: 1, 2, 3, 4, 5
 * 2nd day: 6, 7
 * 3rd day: 8
 * 4th day: 9
 * 5th day: 10
 *
 * Example 2:
 * Input: weights = [3,2,2,4,1,4], days = 3
 * Output: 6
 *
 * Example 3:
 * Input: weights = [1,2,3,1,1], days = 4
 * Output: 3
 *
 * Constraints:
 * - 1 <= days <= weights.length <= 5 * 10^4
 * - 1 <= weights[i] <= 500
 *
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
function shipWithinDays(weights, days) {
    let low = 0;
    let high = 0;

    for (const w of weights) {
        low = Math.max(low, w);
        high += w;
    }

    // Predicate: check if all packages can be shipped within 'days' with a ship capacity of 'cap'
    function canShip(cap) {
        let daysNeeded = 1;
        let currentLoad = 0;

        for (const w of weights) {
            if (currentLoad + w > cap) {
                daysNeeded++;
                currentLoad = w;
                if (daysNeeded > days) return false;
            } else {
                currentLoad += w;
            }
        }

        return daysNeeded <= days;
    }

    let ans = high;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (canShip(mid)) {
            ans = mid;
            high = mid - 1; // Try finding a smaller feasible capacity
        } else {
            low = mid + 1; // Capacity too small
        }
    }

    return ans;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) === 15, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(shipWithinDays([3, 2, 2, 4, 1, 4], 3) === 6, "Test 2 Failed");

    // Test 3: Example 3
    console.assert(shipWithinDays([1, 2, 3, 1, 1], 4) === 3, "Test 3 Failed");

    // Test 4: days equals weights.length -> capacity is max(weights)
    console.assert(shipWithinDays([5, 5, 5], 3) === 5, "Test 4 Failed");

    // Test 5: days is 1 -> capacity is sum(weights)
    console.assert(shipWithinDays([10, 20, 30], 1) === 60, "Test 5 Failed");

    console.log("All Capacity To Ship Packages Within D Days tests passed successfully!");
}

runTests();

