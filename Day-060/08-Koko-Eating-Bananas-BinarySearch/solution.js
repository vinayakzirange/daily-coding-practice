/**
 * LeetCode 875: Koko Eating Bananas (Medium)
 * https://leetcode.com/problems/koko-eating-bananas/
 *
 * Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
 * The guards have gone and will come back in h hours.
 *
 * Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile
 * of bananas and eats k bananas from that pile. If the pile has less than k bananas,
 * she eats all of them instead and will not eat any more bananas during this hour.
 *
 * Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
 *
 * Return the minimum integer k such that she can eat all the bananas within h hours.
 *
 * Example 1:
 * Input: piles = [3,6,7,11], h = 8
 * Output: 4
 *
 * Example 2:
 * Input: piles = [30,11,23,4,20], h = 5
 * Output: 30
 *
 * Example 3:
 * Input: piles = [30,11,23,4,20], h = 6
 * Output: 23
 *
 * Constraints:
 * - 1 <= piles.length <= 10^4
 * - piles.length <= h <= 10^9
 * - 1 <= piles[i] <= 10^9
 *
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {
    let low = 1;
    let high = 0;
    for (const p of piles) {
        if (p > high) high = p;
    }

    function canFinish(k) {
        let hours = 0;
        for (const p of piles) {
            hours += Math.ceil(p / k);
            if (hours > h) return false;
        }
        return true;
    }

    let ans = high;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (canFinish(mid)) {
            ans = mid;
            high = mid - 1; // Try finding a smaller eating speed
        } else {
            low = mid + 1; // Must eat faster
        }
    }

    return ans;
}

// Unit tests
function runTests() {
    // Test 1: piles = [3,6,7,11], h = 8 -> 4
    console.assert(minEatingSpeed([3, 6, 7, 11], 8) === 4, "Test 1 Failed");

    // Test 2: piles = [30,11,23,4,20], h = 5 -> 30
    console.assert(minEatingSpeed([30, 11, 23, 4, 20], 5) === 30, "Test 2 Failed");

    // Test 3: piles = [30,11,23,4,20], h = 6 -> 23
    console.assert(minEatingSpeed([30, 11, 23, 4, 20], 6) === 23, "Test 3 Failed");

    // Test 4: single pile
    console.assert(minEatingSpeed([312884470], 312884469) === 2, "Test 4 Failed");

    // Test 5: piles equal to hours
    console.assert(minEatingSpeed([10, 10, 10], 3) === 10, "Test 5 Failed");

    console.log("All Koko Eating Bananas tests passed successfully!");
}

runTests();
